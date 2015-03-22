var crypto = require('crypto');
var phoneFormatter = require('phone-formatter');
var unirest = require('unirest');
var util = require('util');
var url = require('url');
var Q = require('q');

var defaultUser = 'android_user';
var defaultPassHash = 'j6xeqKf2xcCWobkQz2oERJf2ABc=';
var androidVersion = '1.5';

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

function doRequest(method, reqURL, body, username, password) {
  var deferred = Q.defer(),
      json = JSON.stringify(body),
      md5sum = crypto.createHash('md5').update(json).digest('hex'),
      req = unirest;

  switch (method) {
    case 'POST':
      req = req.post(reqURL);
      break;
    case 'PUT':
      req = req.put(reqURL);
      break;
    case 'GET':
      req = req.get(reqURL);
      break;
    default:
      console.error('%s is not a valid request method', method);
  }

  var parsedURL = url.parse(reqURL);

  var auth = authorizationHeader(username, password, method, md5sum, parsedURL.pathname);

  req = req
    .set('User-Agent', 'Android-Consumer-Application')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Accept-Encoding', 'gzip')
    .set('content-md5', md5sum)
    .set('CLIENT', 'android')
    .set('VERSION', '1.5')
    .set('DEVICE_TOKEN', '')
    .set('TIMEZONE', 'GMT')
    .set('Authorization', auth)
    .strictSSL(false)
    .send(json)
    .end(function (res) {
      deferred.resolve(res);
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

  getMerchants: function (username, password, query) {
    return doRequest('GET', buildURL('/search/merchants', query), null,
                     username, password);
  },

  getMerchant: function (username, password, merchantSlug, query) {
    return doRequest('GET', buildURL('/merchant/'+merchantSlug, query), null,
                     username, password);
  },
};
