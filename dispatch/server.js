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

  // shim'd api
  app.get('/api/locations', function(req, res) {
    return res.json([{
      "id": "c20-pepperburrito33914",
      "name": "3 Pepper Burrito Company",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "26.5606909",
        "lng": "-82.00801400000002"
      },
      "address": {
        "address1": "2522 SANTA BARBARA BLVD STE 30",
        "state": "FL",
        "city": "CAPE CORAL"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "957d185f-92bb-4dd9-8f76-297d0799b19e",
          "dimension": "100x100",
          "actualDimension": "428x244",
          "merchantId": "c20-pepperburrito33914",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c20-pepperburrito33914-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "c0030-10010523",
      "name": "903 MILLS MARKET",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "28.5311416",
        "lng": "-81.3638979"
      },
      "address": {
        "address1": "903 SOUTH MILLS AVENUE",
        "state": "FL",
        "city": "ORLANDO"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "f9b296c7-118d-4f9c-b067-b18e4051cb32",
          "dimension": "100x100",
          "actualDimension": "288x288",
          "merchantId": "c0030-10010523",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c0030-10010523-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "c20-italianmarket32837",
      "name": "All Italian Market and Deli",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "28.3699676",
        "lng": "-81.4271867"
      },
      "address": {
        "address1": "13526 VILLAGE PARK DR STE 214",
        "state": "FL",
        "city": "Orlando"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "39b677a2-3ecb-4965-a93d-b83d21f892f5",
          "dimension": "100x100",
          "actualDimension": "259x83",
          "merchantId": "c20-italianmarket32837",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c20-italianmarket32837-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "lpbagelkingcb",
      "name": "Bagel King",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "28.5820023",
        "lng": "-81.3277373"
      },
      "address": {
        "address1": "1230 S Lakemont Ave",
        "state": "FL",
        "city": "Winter Park"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "5c3aad2b-1e69-4f8b-b3d3-ef6ee06cc65b",
          "dimension": "100x100",
          "actualDimension": "1872x1488",
          "merchantId": "lpbagelkingcb",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/lpbagelkingcb-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "bagelkinglakem32746",
      "name": "Bagel King Lake Mary",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "28.6678749",
        "lng": "-81.31243409999999"
      },
      "address": {
        "address1": "3005 WEST LAKE MARY BLVD",
        "state": "FL",
        "city": "LAKE MARY"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "b96fe18f-8894-435e-b45c-d3402aa18da7",
          "dimension": "100x100",
          "actualDimension": "1800x877",
          "merchantId": "bagelkinglakem32746",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/bagelkinglakem32746-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "c20-baldospizza32750",
      "name": "Baldo's Pizza",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "28.7036435",
        "lng": "-81.3266773"
      },
      "address": {
        "address1": "409 N. Hwy 17-92",
        "state": "FL",
        "city": "Longwood"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "5f573734-8192-4770-b9e4-34e4ec1e23b6",
          "dimension": "100x100",
          "actualDimension": "4212x3317",
          "merchantId": "c20-baldospizza32750",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c20-baldospizza32750-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "lpbaysidegrillno",
      "name": "Bayside Grille",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "27.1152525",
        "lng": "-82.4492212"
      },
      "address": {
        "address1": "918 Tamiami Trail South",
        "state": "FL",
        "city": "Nokomis"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "b05c98c7-b3f9-4020-9724-9f3cafbe5fc0",
          "dimension": "100x100",
          "actualDimension": "960x811",
          "merchantId": "lpbaysidegrillno",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/lpbaysidegrillno-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "c20-beckettssteak96093",
      "name": "Beckett's Steakhouse",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "40.7415454",
        "lng": "-122.9281375"
      },
      "address": {
        "address1": "1324 Nugget Lane",
        "state": "CA",
        "city": "Weaverville"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "d653320f-c2cf-47c5-997c-d31cfa7de24e",
          "dimension": "100x100",
          "actualDimension": "437x457",
          "merchantId": "c20-beckettssteak96093",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c20-beckettssteak96093-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "c20-bellarosa295640",
      "name": "Bella Rosa 2",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "38.3929675",
        "lng": "-120.8024357"
      },
      "address": {
        "address1": "36 Main St",
        "state": "CA",
        "city": "Sutter Creek"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "3b077ef9-8582-40d1-b1c5-69a052e44232",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "c20-bellarosa295640",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "c20-bellarosa95642",
      "name": "Bella Rosa Sports Bar",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "38.3488023",
        "lng": "-120.7741018"
      },
      "address": {
        "address1": "11310 Prospect Drive Suite 50",
        "state": "CA",
        "city": "Jackson"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "6a700491-61e8-418e-ad97-b91d2c4cb3de",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "c20-bellarosa95642",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "c0030-10027479",
      "name": "Bighorn Bar & Grill",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "39.5424616",
        "lng": "-119.8410174"
      },
      "address": {
        "address1": "1325 West Seventh St",
        "state": "NV",
        "city": "Reno"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "bddf2c72-1eaf-45fa-8b3f-12a259485120",
          "dimension": "100x100",
          "actualDimension": "1012x944",
          "merchantId": "c0030-10027479",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c0030-10027479-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "bogartsbageldeli14730",
      "name": "Bogarts Bagel Deli",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "26.0309015",
        "lng": "-80.2968068"
      },
      "address": {
        "address1": "2621 N. Hiatus Road",
        "state": "FL",
        "city": "Cooper City"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "8e090d2e-c6f5-444b-ac4e-89ac756cda37",
          "dimension": "100x100",
          "actualDimension": "400x50",
          "merchantId": "bogartsbageldeli14730",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/bogartsbageldeli14730-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "brewburger34292",
      "name": "BrewBurgers",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "27.107868",
        "lng": "-82.385297"
      },
      "address": {
        "address1": "370 Commercial Court",
        "state": "FL",
        "city": "Venice"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "fac59690-b173-4ce2-8798-1b760f04a145",
          "dimension": "100x100",
          "actualDimension": "990x553",
          "merchantId": "brewburger34292",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/brewburger34292-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "c0030-10048941",
      "name": "BRITISH OPEN PUB",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "27.079165",
        "lng": "-82.3884671"
      },
      "address": {
        "address1": "367 JACARANDA BLVD.",
        "state": "FL",
        "city": "VENICE"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "7e87f6b4-782e-4273-b9b6-742fdfa6a30d",
          "dimension": "100x100",
          "actualDimension": "1294x730",
          "merchantId": "c0030-10048941",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c0030-10048941-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "c20-brooksburgers34102",
      "name": "Brooks Gourmet Burgers and Dogs",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "26.132433",
        "lng": "-81.7951054"
      },
      "address": {
        "address1": "330 9TH ST S",
        "state": "FL",
        "city": "NAPLES"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "42be8be4-55d0-41d1-b893-68d2a9c0c0b8",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "c20-brooksburgers34102",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "bubbalous32701",
      "name": "Bubbalous Bar B Que",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "28.6631913",
        "lng": "-81.3551449"
      },
      "address": {
        "address1": "1049 E ALTAMONTE DRIVE",
        "state": "FL",
        "city": "Altamonte Springs"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "ecc0e105-f775-494a-ab3a-8f9bfaa0e8e7",
          "dimension": "100x100",
          "actualDimension": "581x672",
          "merchantId": "bubbalous32701",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/bubbalous32701-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/New_York",
      "paypalAvailable": false
    }, {
      "id": "burgerbar95222",
      "name": "Burger Bar",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "38.0677832",
        "lng": "-120.5385299"
      },
      "address": {
        "address1": "1225 S. MAIN ST",
        "state": "CA",
        "city": "ANGELS CAMP"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "70899fc1-1114-4480-942c-97161dc3e149",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "burgerbar95222",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "cabosbaja93013",
      "name": "Cabo's Baja Grill and Cantina",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "34.3981738",
        "lng": "-119.517101"
      },
      "address": {
        "address1": "5096 Carpinteria Ave.",
        "state": "CA",
        "city": "Carpinteria"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "05a6fd0f-96c7-4cd4-b2b3-cf98f095367c",
          "dimension": "100x100",
          "actualDimension": "548x251",
          "merchantId": "cabosbaja93013",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/cabosbaja93013-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "c20-cafe8691710",
      "name": "Cafe 86",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "33.9977744",
        "lng": "-117.7141201"
      },
      "address": {
        "address1": "4110 EDISON AVE #109",
        "state": "CA",
        "city": "CHINO"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "8d7d3fdb-f2c1-4b3a-981f-d0b76c110c38",
          "dimension": "100x100",
          "actualDimension": "516x516",
          "merchantId": "c20-cafe8691710",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c20-cafe8691710-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "c20-cafe99inc93673",
      "name": "Cafe 99 Inc",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "36.4483751",
        "lng": "-119.4862019"
      },
      "address": {
        "address1": "36005 HIGHWAY 99",
        "state": "CA",
        "city": "TRAVER"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "f84fb69f-cbbc-49a0-9e0a-ad05aa31f9ae",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "c20-cafe99inc93673",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "cincoflowerrdcmb",
      "name": "Cafe Conception",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "37.48663",
        "lng": "-122.2265099"
      },
      "address": {
        "address1": "2010 Broadway St",
        "state": "CA",
        "city": "Redwood City"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "a37fe709-df4f-4510-b2d5-30e62ebc418f",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "cincoflowerrdcmb",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "c20-cafefigaro94010",
      "name": "Cafe Figaro",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "37.5778696",
        "lng": "-122.34809"
      },
      "address": {
        "address1": "1318 Broadway",
        "state": "CA",
        "city": "Burlingame"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "1228af8f-e563-478b-be31-301373fa4ee5",
          "dimension": "100x100",
          "actualDimension": "179x110",
          "merchantId": "c20-cafefigaro94010",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/c20-cafefigaro94010-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "latitudecinco",
      "name": "Cafe Latitude",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "37.5187544",
        "lng": "-122.253363"
      },
      "address": {
        "address1": "101 Redwood Shores Pkwy",
        "address2": "2nd Floor",
        "state": "CA",
        "city": "Redwood City"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "ed519cc3-70aa-4f52-8095-cfe3a29bd961",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "latitudecinco",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "lpcalpastasb",
      "name": "California Pasta",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "34.4196114",
        "lng": "-119.7000342"
      },
      "address": {
        "address1": "811 B State Street",
        "state": "CA",
        "city": "Santa Barbara"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "91a5b150-4a9f-11e3-ab7e-22000ac53ed4",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "lpcalpastasb",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }, {
      "id": "californiawings900282",
      "name": "California Wings Cafe",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "34.1011905",
        "lng": "-118.3298618"
      },
      "address": {
        "address1": "1649 N Cahuenga Blvd",
        "state": "CA",
        "city": "Los Angeles"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "91a41b07-4a9f-11e3-ab7e-22000ac53ed4",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "californiawings900282",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    }]);
  });

  app.get('/api/locations/*', function(req, res) {
    res.json({
      "id": "californiawings900282",
      "name": "California Wings Cafe",
      "baseImgUrl": "http://leapset-superadmin-s3.leapset.com/",
      "location": {
        "lat": "34.1011905",
        "lng": "-118.3298618"
      },
      "address": {
        "address1": "1649 N Cahuenga Blvd",
        "state": "CA",
        "city": "Los Angeles"
      },
      "deliveryFee": 0.0,
      "minimumOrderValue": 0.0,
      "minDeliveryOrderAmount": 0.0,
      "queueConsumers": 1,
      "images": {
        "image": [{
          "id": "91a41b07-4a9f-11e3-ab7e-22000ac53ed4",
          "dimension": "100x100",
          "actualDimension": "1024x1024",
          "merchantId": "californiawings900282",
          "resourceUri": "http://leapset-superadmin-s3.leapset.com/default-100x100.jpg"
        }]
      },
      "openNow": true,
      "timeZone": "America/Los_Angeles",
      "paypalAvailable": false
    });
  });

  app.get('/api/menus/*', function(req, res) {
    res.json({});
  });

  app.get('/*', function(req, res) {
    res.render('index');
  });
});
