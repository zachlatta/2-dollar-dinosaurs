var unirest = require('unirest');
var phoneFormatter = require('phone-formatter');
var util = require('util');
var crypto = require('crypto');

// This is hardcoded into the application...
var androidRegToken = 'j6xeqKf2xcCWobkQz2oERJf2ABc=';
var androidVersion = '1.5';

var addAuthorization = function (req, username, password) {
  if (!username && !password) { // if no username or password, use defaults
    var epoch = (new Date()).getTime();
    util.format('MWS=%s:%s:%d', epoch);
    req.set('Authorization',
            'MWS=android_user:ZGjuD3C7aeFxJGMEKrXp1mD5N1g=:1426388283917');
  }
};

function parsePhoneNumber(number) {
  var normalized = phoneFormatter.format(number, 'NNN-NNN-NNNN');
  var split = normalized.split('-');
  return {
    areaCode: split[0],
    subscriberNumber: split[1],
    exchangeCode: split[2]
  };
}

function doRequest(method, url, body, username, password) {
  var json = JSON.stringify(body);
  var md5sum = crypto.createHash('md5').update(json).digest('hex');
  var req = unirest;

  switch (method) {
    case 'POST':
      req = req.post(url);
      break;
    case 'PUT':
      req = req.put(url);
      break;
    default:
      console.error('%s is not a valid request method', method);
  }

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
    .proxy('http://ngrok.com:60492')
    .strictSSL(false)
    .send(json);

  addAuthorization(req, username, password);

  req
    .end(function (err, res) {
      if (err) {
        console.log('Error making request: ', err);
      }
      console.log(res.body);
    });
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

    doRequest('PUT', 'https://api1.leapset.com/api-v2/service/customer', body);
  },

  getMerchants: function () {
  }
};
