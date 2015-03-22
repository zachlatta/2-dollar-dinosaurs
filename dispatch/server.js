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
    leapset.getMerchants('jfrost@cold.com', 'foobarfoobar1', {
      includeImages: true
    }).then(function(data) {
      res.json(data.body.merchant);
    });
  });

  app.get('/api/menus/:restaurantSlug', function(req, res) {
    leapset.getMerchant('jfrost@cold.com', 'foobarfoobar1',
                        req.params.restaurantSlug)
    .then(function (merchant) {
      var promises = _.map(merchant.sessions.session, function (session) {
        return leapset.getCatalog('jfrost@cold.com', 'foobarfoobar1',
                                  req.params.restaurantSlug, session.id);
      });
      return Q.all(promises);
    })
    .then(function (catalogs) {
      var items = [];
      _.each(catalogs, function (catalog) {
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
      console.error('error', err);
      res.json(err);
    })
    .done();
  });

  app.get('/*', function(req, res) {
    res.render('index');
  });
});
