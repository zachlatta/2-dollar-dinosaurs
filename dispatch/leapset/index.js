var crypto = require('crypto');
var phoneFormatter = require('phone-formatter');
var unirest = require('unirest');
var util = require('util');
var url = require('url');
var async = require('async');
var colors = require('colors');
var Q = require('q');

var defaultUser = 'android_user';
var defaultPassHash = 'j6xeqKf2xcCWobkQz2oERJf2ABc=';
var androidVersion = '1.5';

var user_accs = [{
  username: 'jfrost@cold.com',
  password: 'foobarfoobar1'
}, {
  username: 'aacoder92@gmail.com',
  password: 'foobarfoobar1'
}, {
  username: 'aacoder92+1242@gmail.com',
  password: 'asdasdasd123'
}];

var last_user_index = 0;
function selectUser() {
  last_user_index = last_user_index >= user_accs.length - 1 ? 0 : last_user_index + 1;
  return user_accs[last_user_index];
}

// queue for processing requests serially
var REQUEST_RATE_LIMIT = 5001; // rate limit to 1 req/5 sec -- todo: we can parallelize requests by rotating accounts w/ local rate limit on each acc
var REQUEST_RETRY_THRESH = 3; // how many times to try again after failing?
var requestQueue = async.queue(function(data, cb) {
  var md5sum = crypto.createHash('md5').update(data.json).digest('hex');
  var req;
  switch (data.method) {
    case 'POST':
      req = unirest.post(data.reqURL);
      break;
    case 'PUT':
      req = unirest.put(data.reqURL);
      break;
    case 'GET':
      req = unirest.get(data.reqURL);
      break;
    default:
      console.error('%s is not a valid request method', data.method);
  }

  var parsedURL = url.parse(data.reqURL);

  var user = selectUser();
  var auth = authorizationHeader(user.username, user.password, data.method, md5sum, parsedURL.pathname);

  req = req.set('User-Agent', 'Android-Consumer-Application')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Accept-Encoding', 'gzip')
    .set('Host', 'api1.leapset.com')
    .set('Connection', 'Keep-Alive')
    .set('content-md5', md5sum)
    .set('CLIENT', 'android')
    .set('VERSION', '1.5')
    .set('DEVICE_TOKEN', '')
    .set('TIMEZONE', 'America/New_York')
    .set('Authorization', auth)
    .strictSSL(false);

  var rate_delay = REQUEST_RATE_LIMIT - (new Date() - (user.last_req || 1));
  setTimeout(function doRequest() {
    if(!data.attempts) data.attempts = 0;
    user.last_req = new Date();
    console.log('API REQ:'.bold.underline.green + ' ' + data.method + ' ' + data.reqURL + '\n' 
              + '         Username: '.bold + user.username + ' :: Password: '.bold + user.username + '\n'
              + '         Attempts: '.bold + data.attempts + ' :: Rate Delay: ' + rate_delay);
    req.send(data.json)
      .end(function (res) {
        if(res.error && data.attempts < REQUEST_RETRY_THRESH) {
          data.attempts ++;
          requestQueue.push(data, cb);
        } else {
          return cb(res.error, res.body);
        }
      });
  }, rate_delay > 0 ? rate_delay : 0);
}, user_accs.length);

function parsePhoneNumber(number) {
  var normalized = phoneFormatter.format(number, 'NNN-NNN-NNNN');
  var split = normalized.split('-');
  return {
    areaCode: split[0],
    subscriberNumber: split[1],
    exchangeCode: split[2]
  };
}

function hashPassword(pass, username) {
  return crypto.createHmac('sha1', username).update(pass).digest('base64');
}

function authToken(username, password, method, contentMD5, epoch, relativeURL) {
  var passHash;
  if (password == defaultPassHash) {
    passHash = defaultPassHash;
  } else {
    passHash = hashPassword(password, username);
  }

  var toHash = util.format("%s\n%s\napplication/json\n%d\n%s", method,
                           contentMD5, epoch, relativeURL);
  var signature = crypto
                    .createHmac('sha1', passHash)
                    .update(toHash)
                    .digest('base64');
  return signature;
}

function authorizationHeader(username, password, method, contentMD5,
                             relativeURL) {
  var epoch = (new Date()).getTime();
  var token = authToken(username, password, method, contentMD5, epoch, relativeURL);
  return util.format('MWS=%s:%s:%d', username, token, epoch);
}

function doRequest(method, reqURL, body) {
  var deferred = Q.defer();
  var json = JSON.stringify(body);

  console.log("Queued Request: ".bold + reqURL);
  requestQueue.push({
    method: method,
    json: json,
    reqURL: reqURL
  }, function(err, body) {
    if(err) return deferred.reject(err);
    deferred.resolve(body);
  });
  
  return deferred.promise;
}

function buildURL(endpoint, query) {
  var u = new url.Url();
  u.protocol = 'https';
  u.hostname = 'api1.leapset.com';
  u.pathname = '/api-v2/service' + endpoint;
  u.query = query;
  return url.format(u);
}

module.exports = {
  createAccount: function (firstName, email, phone, password) {
    phone = parsePhoneNumber(phone);

    var body = {
      rewardsNotification: true,
      id: null,
      eReceiptNotification: true,
      password: password,
      firstName: firstName,
      email: email,
      userName: email,
      contacts: {
        contact: [{
          phone: {
            areaCode: phone.areaCode,
            subscriberNumber: phone.subscriberNumber,
            exchangeCode: phone.exchangeCode
          }
        }]
      }
    };

    return doRequest('PUT', buildURL('/customer'), body, defaultUser,
                     defaultPassHash);
  }, 

  getMerchants: function (query) {
    return doRequest('GET', buildURL('/search/merchants', query), null);
  },

  getMerchant: function (merchantSlug, query) {
    return doRequest('GET', buildURL('/merchant/'+merchantSlug, query), null);
  },

  getCatalog: function (merchantSlug, menuID, query) {
    return doRequest('GET',
                     buildURL('/catalog/'+merchantSlug+'/'+menuID, query),
                     null);
  }
};
