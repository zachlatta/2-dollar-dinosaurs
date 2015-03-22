var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');

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

  app.get('/api/menus/*', function(req, res) {
    res.json({});
  });

  app.get('/*', function(req, res) {
    res.render('index');
  });
});
