var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var Q = require('q');

var _ = require('lodash');
var PostgresStore = require('connect-pg-simple')(session);
var pg = require('pg');

var secrets = require('./config/secrets');

var app = express();

var knex = require('knex')({
  client: 'pg',
  connection: secrets.databaseURL
});

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use('/statics', express.static(__dirname + '/src'));
app.engine('html', require('swig').renderFile);

app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret
}));

var server = app.listen(app.get('port'), function () {
  console.log(
    'dispatch server listening on %s:%d in %s mode',
    server.address().address,
    server.address().port,
    app.get('env')
  );

  var leapset = require('./leapset');

  app.get('/api/locations', function(req, res) {
    leapset.getMerchants({
      includeImages: true
    }).then(function(data) {
      res.json(data.merchant);
    });
  });

  app.get('/api/locations/:location_id', function(req, res) {
    leapset.getMerchant(req.params.location_id, {
      includeImages: true
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get('/api/locations/search', function(req, res) {
    leapset.getMerchants(req.params.location_id, {
      search: req.query.search,
      recs: req.query.page,
      sort: req.query.sort || 'DISTANCE',
      searchRadius: req.query.searchRadius || 8,
      includeImages: true
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get('/api/menus/:restaurantSlug', function(req, res) {
    leapset.getMerchant(req.params.restaurantSlug)
    .then(function (merchant) {
      var promises = _.map(merchant.sessions.session, function (session) {
        return leapset.getCatalog(req.params.restaurantSlug, session.id);
      });
      return Q.all(promises);
    })
    .then(function (catalogs) {
      var items = [];
      _.each(catalogs, function (catalog) {
        if(!catalog) return;
        _.each(catalog.categories.category, function (item) {
          items.push(item);
        });
      });
      return items;
    })
    .then(function (items) {
      res.json(items);
    })
    .catch(function (err) {
      res.status(500).json(err);
    })
    .done();
  });

  app.get('/api/brunchery', function(req, res) {
    require('unirest').get('https://munchery.com/menus.json')
                      .set('Cookie', 'first_impression=1427660143; visit_id=BAhpA0eBKQ%3D%3D--2831ab42f52f7719f1dd98d65947d58855d81422; o=BAgiE3d3dy5nb29nbGUuY29t--3054409e88a7a2d5f77759be96cad2d996ca3c9a; _session_id=3a8bdadb341d96ce7d2c293033087a58; optimizelyEndUserId=oeu1427660146280r0.8165671362075955; ajs_anonymous_id=%2216a57705-8341-49ff-b9dc-fe4643c74653%22; menu_zipcode=94114; menu_center=SF-MISSION; _hp2_id.343548505=1947775289133049.3524288092.3286669805; __kla_id=eyIkcmVmZXJyZXIiOnsidHMiOjE0Mjc2ODUzNTQsInZhbHVlIjoiaHR0cHM6Ly9tdW5jaGVyeS5jb20vIiwiZmlyc3RfcGFnZSI6Imh0dHBzOi8vbXVuY2hlcnkuY29tL21lbnVzL3NmLyMvMCJ9fQ==; _ok=7717-493-10-6069; vanity_id=d4495e91dedcb035a87c6ea9c8f9570c; engagements=62a2f856-5b75-4154-a4df-bcdec6835094__1427660143__d4cd4d; optimizelySegments=%7B%22206884852%22%3A%22gc%22%2C%22206888833%22%3A%22false%22%2C%22206904444%22%3A%22search%22%7D; optimizelyBuckets=%7B%7D; olfsk=olfsk4099759580567479; wcsid=PZrbKWbEsAGkZztx966Vn3Y5JWe2p1ph; hblid=wa1VEeC3qkNZQztd966Vn58ICWFUh105; _okbk=cd5%3Davailable%2Ccd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1428458231824%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; _okac=cced79745732bfdccb8db4f4fd401475; _okla=1; _oklv=1428465285517%2CPZrbKWbEsAGkZztx966Vn3Y5JWe2p1ph; cookie_menu_visits=BAhpEA%3D%3D--5a5a83dfa12b8c89022cd6c978fca8fd1dc7677e; __utma=109797017.2040762598.1427660146.1428458225.1428486174.6; __utmb=109797017.1.10.1428486174; __utmc=109797017; __utmz=109797017.1428410977.4.4.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); interstate_v2_7c124a21b973a8760c9a81beee003579ad0cfc2e=%7B%22user_identifier%22%3A%22a90e2b9c-f93ff607-6f25a49e-50db8de1%22%2C%22last_updated%22%3A1428486174250%2C%22utm_campaign%22%3Anull%2C%22utm_source%22%3Anull%2C%22utm_medium%22%3Anull%2C%22utm_term%22%3Anull%2C%22utm_content%22%3Anull%2C%22last_visit%22%3A1428486174254%7D; ajs_user_id=null; ajs_group_id=null; __insp_slim=1428486176267; __insp_wid=1507968825; __insp_nv=true; __insp_ref=d; _hp2_ses.114698471=*; _hp2_id.114698471=1290291042792629.1845084780.3238795367; __insp_norec_howoften=true; __insp_norec_sess=true')
                      .end(function(data) {
      if(data.error) return res.status(500).json(data.error);
      return res.json(data.body);
    });
  });

  app.get('/*', function(req, res) {
    res.render('index');
  });
});
