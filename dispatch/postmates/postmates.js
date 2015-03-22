var https = require('https'),
    _ = require('lodash'),
    crypto = require('crypto'),
    qs = require('querystring'); 

var config = {
  referral_code: '89ef'
};

function randomEmail() {
  return 'ily@gmail.com';
}

function randomPassword() {
  return 'foobarfoobar1';
}

//opitons.password is api_key for everything other than login
function buildRequest(options) {
  options = _.extend({
    did: crypto.randomBytes(8).toString('hex'), //generate random 64-bit hex string
    auth: null,
    path: '',
    data: null
  }, options);

  var request_opts = {
    hostname: "ipa.postmates.com",
    port: 443,
    path: '/' + options.path,
    method: 'POST',
    headers: {
      'User-Agent': 'PostmatesAndroid 2.0 rv:29 (Google Nexus 4 - 5.0.0 - API 21 - 768x1280; Android 5.0 21; en_US)'
    }
  };
  request_opts.path += '?did=' + options.did;
  if(options.auth) {
    request_opts.headers.Authorization = 'Basic ' + new Buffer(options.auth.email + ":" + options.auth.password).toString('base64');
  }
  if(options.data) {
    request_opts.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8";
    request_opts.headers['Content-Length'] = qs.stringify(options.data).length;
  }
  return request_opts;
}

function makeRequest(options, cb) {
  var req = https.request(buildRequest(options), function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk.toString('utf8');
    }).on('end', function() {
      return cb(null, JSON.parse(data));
    }).on('err', function(err) {
      return cb(err);
    });
  }).on('error', function(e) {
    return cb(err);
  });
  if(options.data) {
    req.write(qs.stringify(options.data));
  }
  req.end();
}

function createCustomer(cb) {
  var email = randomEmail(),
      password = randomPassword(),
      api_key = '',
      cus_data = {};

  //register account
  makeRequest({
    data: {
      email: email,
      password: password
    },
    path: 'v1/customers'
  }, function(err, data) {
    if(err) return cb(err);
    cus_data = data;

    //log into account
    makeRequest({
      auth: {
        email: email,
        password: password
      },
      data: { //just pseudo for now
        last_lat: 37.782218,
        last_lng: -122.410317,
        device_id: '6of949a437012df74c7ab5897a563c8a' 
      },
      path: 'v1/login_customer'
    }, function(err, data) {
      if(err) return cb(err);
      api_key = data.api_key;

      return cb(null, {
        customer: cus_data,
        api_key: api_key,
        email: email,
        password: password,
        session_auth: { //convenience to pass in for auth later in makeRequest
          email: email,
          password: api_key
        }
      });
    });
  });
};

function applyReferralCode(customer, code, cb) {
  //log into account
  makeRequest({
    auth: customer.session_auth,
    data: {
      code: code
    },
    path: 'v1/promos'
  }, cb);
};

createCustomer(function(err, data) {
  applyReferralCode(data, config.referral_code, function(err, referral_data) {
    if(err) return console.log(err);
    console.log("===== ACCOUNT INFORMATION =====");
    console.log("Email: " + data.email);
    console.log("Password: " + data.password);
    console.log(referral_data);
  });
});
