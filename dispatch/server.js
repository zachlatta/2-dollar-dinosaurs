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

  app.get('/api/locations/:location_id', function(req, res) {
    leapset.getMerchant('jfrost@cold.com', 'foobarfoobar1', req.params.location_id, {
      includeImages: true
    }).then(function(data) {
      res.json(data.body);
    });
  });

  app.get('/api/menus/*', function(req, res) {
    var data = {
      "categories": {
        "category": [{
          "id": "315000e2-a731-4675-8b22-e888d6974643",
          "name": "Open Flame Plates",
          "description": "All plates served with your choice of 2 side orders: French fries, steamed veggies, green salad, grilled zucchini, or brown rice or white rice with your choice of seasonings: Cajun, garlic butter, lemon pepper, or house. $0.75 extra charge for upgrade.",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 0,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "e166e919-ce2f-4414-d978-efd5d1a08e1e",
              "name": "Barramundi",
              "description": "Also known as Asian sea bass.",
              "merchantId": "lpfishwildrwc22",
              "reference": "4",
              "price": 11.99,
              "isAuxiliary": false
            }, {
              "id": "98db0202-37c7-4cea-f7d2-2014df3563c1",
              "name": "Mahi Mahi",
              "merchantId": "lpfishwildrwc22",
              "reference": "8",
              "price": 11.99,
              "isAuxiliary": false
            }, {
              "id": "5a75eb6e-120c-49c2-864d-301be4ab23ee",
              "name": "Salmon",
              "merchantId": "lpfishwildrwc22",
              "reference": "1",
              "price": 11.99,
              "isAuxiliary": false
            }, {
              "id": "51e8b507-48f5-4b8a-ba2e-221a67dc164f",
              "name": "Swai",
              "description": "A whitefish from Asia similar to catfish.",
              "merchantId": "lpfishwildrwc22",
              "reference": "6",
              "price": 9.79,
              "isAuxiliary": false
            }, {
              "id": "8bb1c0de-16ca-46a3-e59e-b8c8ddb2bfba",
              "name": "Tilapia",
              "merchantId": "lpfishwildrwc22",
              "reference": "5",
              "price": 9.79,
              "isAuxiliary": false
            }, {
              "id": "38206c78-4a07-4db3-8c92-861b33d1afb4",
              "name": "Trout",
              "merchantId": "lpfishwildrwc22",
              "reference": "7",
              "price": 10.99,
              "isAuxiliary": false
            }, {
              "id": "513d2fce-a825-490a-c042-cf516ff2d67e",
              "name": "Shrimp",
              "merchantId": "lpfishwildrwc22",
              "reference": "2",
              "price": 11.99,
              "isAuxiliary": false
            }, {
              "id": "f4304557-f441-45c0-feef-99472f9b7484",
              "name": "Shrimp Skewer",
              "merchantId": "lpfishwildrwc22",
              "reference": "3",
              "price": 11.99,
              "isAuxiliary": false
            }, {
              "id": "c71aca64-77ca-4039-f0bb-c23772cc1633",
              "name": "Tip",
              "merchantId": "lpfishwildrwc22",
              "reference": "251",
              "price": 30.00,
              "isAuxiliary": false
            }, {
              "id": "fea94eb5-7599-422a-d774-4a5d5f84d2e6",
              "name": "Ichiban",
              "merchantId": "lpfishwildrwc22",
              "reference": "253",
              "price": 3.99,
              "isAuxiliary": false
            }, {
              "id": "36f38039-84d2-4416-d362-68e6d5f00464",
              "name": "Tip",
              "merchantId": "lpfishwildrwc22",
              "reference": "254",
              "price": 40.00,
              "isAuxiliary": false
            }, {
              "id": "73636b51-0b42-46bf-e5e9-9d57de062c40",
              "name": "Tip",
              "merchantId": "lpfishwildrwc22",
              "reference": "255",
              "price": 10.00,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "fa3f9b90-957a-4ddd-bd09-3303de469700",
          "name": "Grill and More",
          "description": "Includes brown rice and steamed veggies.",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 1,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "168882a0-f003-4e06-85a5-8d4d361517e8",
              "name": "Chicken Katsu",
              "merchantId": "lpfishwildrwc22",
              "reference": "9",
              "price": 8.99,
              "isAuxiliary": false
            }, {
              "id": "4990d456-beb0-4dee-f2b1-dc4e6b7b96ef",
              "name": "Grilled Chicken",
              "merchantId": "lpfishwildrwc22",
              "reference": "11",
              "price": 9.99,
              "isAuxiliary": false
            }, {
              "id": "d695bf50-ab2c-4f44-b038-9103bbe60587",
              "name": "Grilled Short Ribs [3]",
              "merchantId": "lpfishwildrwc22",
              "reference": "10",
              "price": 10.99,
              "isAuxiliary": false
            }, {
              "id": "10e83b85-0b3a-4fb9-b3f8-de58aec11260",
              "name": "Kalua Plate",
              "merchantId": "lpfishwildrwc22",
              "reference": "239",
              "price": 9.99,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "af0c5eb5-ff8c-4c79-9707-88b97f78535e",
          "name": "Salads",
          "description": "All salads come with mixed greens, tomato, cabbage, carrot, and Romaine lettuce. Romaine lettuce only is served on the Caesar . Salads served with your choice of dressing: ranch, miso, house, Italian, or sesame seeds.\r\n",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 2,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "265db293-b137-41ff-acc3-f6415e340430",
              "name": "Caesar Salad",
              "description": "Served with grilled mixed fish.",
              "merchantId": "lpfishwildrwc22",
              "reference": "18",
              "price": 10.99,
              "isAuxiliary": false
            }, {
              "id": "34d343f4-3519-4133-9803-86fc29c3b99e",
              "name": "Grilled Chicken Salad",
              "merchantId": "lpfishwildrwc22",
              "reference": "19",
              "price": 9.99,
              "isAuxiliary": false
            }, {
              "id": "c96b081d-7cba-4db2-8f33-81fddffabaf1",
              "name": "Salmon Salad",
              "description": "Cooked with Cajun or lemon pepper.",
              "merchantId": "lpfishwildrwc22",
              "reference": "21",
              "price": 11.99,
              "isAuxiliary": false
            }, {
              "id": "fb1aae99-80cc-41c8-dbe1-9d865e3e0d06",
              "name": "Shrimp Salad",
              "description": "Cooked with Cajun or lemon pepper.",
              "merchantId": "lpfishwildrwc22",
              "reference": "20",
              "price": 11.99,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "765682d1-2dfa-4563-b3bb-863ed22bfe2e",
          "name": "I Like It Fried ",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 3,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "39815618-bad0-4d4f-9165-f64db38047c8",
              "name": " Fried Calamari ",
              "merchantId": "lpfishwildrwc22",
              "reference": "39",
              "price": 8.69,
              "isAuxiliary": false
            }, {
              "id": "50d5b568-9417-4270-f09b-30f8afc6e0c0",
              "name": "Chicken Tender",
              "merchantId": "lpfishwildrwc22",
              "reference": "38",
              "price": 8.69,
              "isAuxiliary": false
            }, {
              "id": "6cc6a48d-4fe6-4abf-a21a-3e2ba041bd1a",
              "name": " Fried Clam ",
              "merchantId": "lpfishwildrwc22",
              "reference": "41",
              "price": 8.69,
              "isAuxiliary": false
            }, {
              "id": "957120db-c5c9-4503-fe75-1befa306170e",
              "name": "Fish & Chips ",
              "merchantId": "lpfishwildrwc22",
              "reference": "37",
              "price": 8.69,
              "isAuxiliary": false
            }, {
              "id": "938cbfa5-2822-467d-c55e-44a29211d168",
              "name": "Fried Wild Pacific Oyster",
              "merchantId": "lpfishwildrwc22",
              "reference": "40",
              "price": 8.69,
              "isAuxiliary": false
            }, {
              "id": "bdb5741d-da94-4abb-c489-3fe0e9600105",
              "name": "Popcorn Shrimp  ",
              "merchantId": "lpfishwildrwc22",
              "reference": "218",
              "price": 8.69,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "6b94d39d-2792-46de-be5b-134a556322aa",
          "name": "Sides",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 4,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "df1688ff-c73f-4a31-b975-382640d14bfc",
              "name": "Side of Brown Rice",
              "merchantId": "lpfishwildrwc22",
              "reference": "16",
              "price": 1.99,
              "isAuxiliary": false
            }, {
              "id": "7cf8a9d3-d2f0-442c-bccd-c8cbf0a51d10",
              "name": "Side of French Fries",
              "merchantId": "lpfishwildrwc22",
              "reference": "12",
              "price": 1.99,
              "isAuxiliary": false
            }, {
              "id": "effd35e5-1114-4b2c-f58a-11e605d34184",
              "name": "Green Salad",
              "merchantId": "lpfishwildrwc22",
              "reference": "14",
              "price": 1.99,
              "isAuxiliary": false
            }, {
              "id": "be0229a0-cf39-4151-fc8c-04f7908f023f",
              "name": " Zucchini",
              "merchantId": "lpfishwildrwc22",
              "reference": "15",
              "price": 1.99,
              "isAuxiliary": false
            }, {
              "id": "560da07b-f37b-4143-dc44-e5b151c651d0",
              "name": "Side of Rice ",
              "merchantId": "lpfishwildrwc22",
              "reference": "17",
              "price": 1.99,
              "isAuxiliary": false
            }, {
              "id": "b504df5e-9a32-4628-9b03-a64e7e34440b",
              "name": "Steamed Veggie",
              "merchantId": "lpfishwildrwc22",
              "reference": "13",
              "price": 1.99,
              "isAuxiliary": false
            }, {
              "id": "845f61b6-6bd8-4731-9a30-ccd184ae6718",
              "name": "Side Salmon",
              "merchantId": "lpfishwildrwc22",
              "reference": "86",
              "price": 6.00,
              "isAuxiliary": false
            }, {
              "id": "75d87e74-1d43-4e67-87d8-ba87161c36be",
              "name": "Side Mahi Mahi",
              "merchantId": "lpfishwildrwc22",
              "reference": "87",
              "price": 6.00,
              "isAuxiliary": false
            }, {
              "id": "11455e42-8a27-43dd-c165-f56168878b66",
              "name": "Side Swai",
              "merchantId": "lpfishwildrwc22",
              "reference": "88",
              "price": 6.00,
              "isAuxiliary": false
            }, {
              "id": "df9da438-1279-4646-c8bd-b3130dadcabb",
              "name": "Side Talapia",
              "merchantId": "lpfishwildrwc22",
              "reference": "89",
              "price": 6.00,
              "isAuxiliary": false
            }, {
              "id": "a125c84b-ddb3-42f4-8d9f-348624aeddbf",
              "name": "Side Trout",
              "merchantId": "lpfishwildrwc22",
              "reference": "90",
              "price": 6.00,
              "isAuxiliary": false
            }, {
              "id": "aaf7bc4b-580c-43f9-f9a5-c8a760c6cb4e",
              "name": "Side Large Shrimp[5]",
              "merchantId": "lpfishwildrwc22",
              "reference": "91",
              "price": 5.00,
              "isAuxiliary": false
            }, {
              "id": "203198b3-e712-4586-a97a-ff3af3e1cede",
              "name": "Side Small Shrimp[10]",
              "merchantId": "lpfishwildrwc22",
              "reference": "92",
              "price": 5.00,
              "isAuxiliary": false
            }, {
              "id": "d06b55bc-7f0f-4c31-cd12-f3d6b7b0cde2",
              "name": "Side Barramundi",
              "merchantId": "lpfishwildrwc22",
              "reference": "93",
              "price": 8.25,
              "isAuxiliary": false
            }, {
              "id": "90bb897b-0f83-4974-93ed-f72d34d3a83d",
              "name": "Short Ribs[2]",
              "merchantId": "lpfishwildrwc22",
              "reference": "116",
              "price": 7.49,
              "isAuxiliary": false
            }, {
              "id": "9aa9a6bd-b190-4098-bb5b-b06c80bd3d41",
              "name": "Chicken[1]",
              "merchantId": "lpfishwildrwc22",
              "reference": "153",
              "price": 2.99,
              "isAuxiliary": false
            }, {
              "id": "0a06b3a9-80c1-497b-a11c-d1cf14462cf0",
              "name": "chicken katsu",
              "merchantId": "lpfishwildrwc22",
              "reference": "155",
              "price": 3.25,
              "isAuxiliary": false
            }, {
              "id": "454dcdee-9842-4585-f0aa-b236dfe8cd0f",
              "name": "Shrimp Skewer ",
              "merchantId": "lpfishwildrwc22",
              "reference": "211",
              "price": 6.95,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "91571fea-b914-4c8f-95db-d5e4142d4681",
          "name": "Tacos",
          "description": "Fresh grilled tacos either a combo with a drink and a side or ala carte. ",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 5,
          "subCategories": {
            "category": [{
              "id": "cf96b8fe-4a2f-4f43-f737-ca567a1eb56d",
              "name": "Taco Combos",
              "description": "Combo includes your choice of 2 tacos, fries, and a drink. Grilled wild tacos come with cabbage, carrot, tomato, mango, and house chipotle cream sauce.\r\n",
              "merchantId": "lpfishwildrwc22",
              "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
              "parentId": "91571fea-b914-4c8f-95db-d5e4142d4681",
              "lineNo": 6,
              "products": {
                "product": [{
                  "id": "3eb9815f-ffd0-48d2-c427-7da1afde708c",
                  "name": "Salmon Tacos Combo",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "22",
                  "price": 8.99,
                  "isAuxiliary": false
                }, {
                  "id": "b11cead8-9dcc-41bf-cef7-aac652724834",
                  "name": "Mahi Tacos Combo",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "23",
                  "price": 8.99,
                  "isAuxiliary": false
                }, {
                  "id": "d901c425-129f-42c3-8778-8bd9b7b6eaec",
                  "name": "Shrimp Tacos Combo",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "24",
                  "price": 8.99,
                  "isAuxiliary": false
                }, {
                  "id": "e25e91b7-d9bd-4418-cdcf-92b959845134",
                  "name": "Tilapia Tacos Combo",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "25",
                  "price": 8.99,
                  "isAuxiliary": false
                }, {
                  "id": "d049d8bf-d959-4eb4-99de-baeb6ba02ba6",
                  "name": "Chicken Tacos Combo",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "26",
                  "price": 8.99,
                  "isAuxiliary": false
                }, {
                  "id": "ce350205-c667-4725-e600-74e7343863db",
                  "name": "Taco Combination",
                  "description": "2 different tacos, a drink, and your choice of a side.",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "106",
                  "price": 8.99,
                  "isAuxiliary": false
                }, {
                  "id": "31680756-c40c-4c01-c6e9-d21bc0c0d99b",
                  "name": "Kalua Taco Combo",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "241",
                  "price": 8.99,
                  "isAuxiliary": false
                }]
              }
            }, {
              "id": "040a9296-a6b7-4461-cbc7-bcfd961bfecb",
              "name": "Taco a La Carte",
              "description": "Grilled wild tacos with cabbage, carrot, tomato, mango, and house cream sauce.\r\n",
              "merchantId": "lpfishwildrwc22",
              "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
              "parentId": "91571fea-b914-4c8f-95db-d5e4142d4681",
              "lineNo": 7,
              "products": {
                "product": [{
                  "id": "285913d5-96b6-45f4-e351-6c02c720db94",
                  "name": "Salmon Taco",
                  "description": "1 grilled salmon taco without any sides.",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "27",
                  "price": 2.99,
                  "isAuxiliary": false
                }, {
                  "id": "19d79115-fd9b-4ba6-dc07-9b01c5df7031",
                  "name": "Mahi Taco",
                  "description": "1 grilled maui taco with cabbage, carrot, tomato,  mango, and house chipotle cream sauce. ",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "28",
                  "price": 2.99,
                  "isAuxiliary": false
                }, {
                  "id": "80355b72-a2ac-4130-9577-69beaaedd338",
                  "name": "Shrimp Taco",
                  "description": "1 grilled shrimp taco with cabbage, carrot, tomato,  mango, and house chipotle cream sauce. ",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "29",
                  "price": 2.99,
                  "isAuxiliary": false
                }, {
                  "id": "25b7c707-d3b5-4b6c-f2eb-61cbc59aac6d",
                  "name": "Tilapia Taco",
                  "description": "1 grilled tilapia taco with cabbage, carrot, tomato,  mango, and house chipotle cream sauce. ",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "30",
                  "price": 2.99,
                  "isAuxiliary": false
                }, {
                  "id": "af3796c8-ce4c-4270-c88a-cac943b70048",
                  "name": "Chicken Taco",
                  "description": "1 grilled chicken taco with cabbage, carrot, tomato, mango and house chipotle cream sauce. ",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "31",
                  "price": 2.99,
                  "isAuxiliary": false
                }, {
                  "id": "fb87e467-b965-4c85-f40d-719ced2584ed",
                  "name": "Kalua Taco",
                  "merchantId": "lpfishwildrwc22",
                  "reference": "240",
                  "price": 2.99,
                  "isAuxiliary": false
                }]
              }
            }]
          }
        }, {
          "id": "ef93ba8c-14b3-4f55-9cf1-35424a2bd538",
          "name": "Fresh Wraps",
          "description": "Served with rice, cabbage, carrot, tomato, mango, and house chipotle cream sauce\r\n",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 8,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "bce4218b-b2b3-4c66-8b8b-cc64d0583173",
              "name": "Grilled Chicken Wrap",
              "merchantId": "lpfishwildrwc22",
              "reference": "32",
              "price": 6.79,
              "isAuxiliary": false
            }, {
              "id": "cdbf3295-46ca-43e3-8827-e97e5f51a7a2",
              "name": "Grilled Fish Wrap",
              "merchantId": "lpfishwildrwc22",
              "reference": "34",
              "price": 7.59,
              "isAuxiliary": false
            }, {
              "id": "776d16b8-d551-44ec-fa39-cd5480a4a5be",
              "name": "Grilled Shrimp Wrap",
              "merchantId": "lpfishwildrwc22",
              "reference": "33",
              "price": 7.59,
              "isAuxiliary": false
            }, {
              "id": "b118ec8a-d349-4e6a-f43e-9bd378f15640",
              "name": "Kalua Wrap",
              "merchantId": "lpfishwildrwc22",
              "reference": "238",
              "price": 7.59,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "fd1c5d56-20f3-446b-81b8-3c3a9d9934e9",
          "name": "Pasta & Steamed ",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 9,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "367e2fa2-d469-4c0e-c1f6-1d9e08471f2b",
              "name": "Shrimp Pasta Marinara ",
              "merchantId": "lpfishwildrwc22",
              "reference": "221",
              "price": 9.89,
              "isAuxiliary": false
            }, {
              "id": "39fcbe88-1fcb-410f-9f37-0f062856260b",
              "name": "Steamed Clams with Pasta ",
              "merchantId": "lpfishwildrwc22",
              "reference": "222",
              "price": 9.89,
              "isAuxiliary": false
            }, {
              "id": "3b72bd73-30d5-4db8-8da0-36858665532e",
              "name": "Steamed Mussels with Pasta",
              "merchantId": "lpfishwildrwc22",
              "reference": "223",
              "price": 9.89,
              "isAuxiliary": false
            }, {
              "id": "fd4ab75f-f51c-45bc-cc52-cf3c4c53ebe4",
              "name": "Salmon Pasta Marinara",
              "merchantId": "lpfishwildrwc22",
              "reference": "228",
              "price": 9.89,
              "isAuxiliary": false
            }, {
              "id": "62fa3080-deb0-439e-f413-672dd4409d77",
              "name": "Veggie Pasta Marinara",
              "merchantId": "lpfishwildrwc22",
              "reference": "232",
              "price": 7.95,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "11614906-de54-44c5-a94a-f72a05688a4e",
          "name": "Catering",
          "description": "Available for medium or large tray. Please ask for more details. Cooked in your choice of seasonings: Cajun, garlic butter, lemon pepper, or house.\r\n",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 10,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "4ef521c8-c0d8-4314-cd72-149db9338ba9",
              "name": "Assorted Home baked Cookies 30 pc",
              "merchantId": "lpfishwildrwc22",
              "reference": "250",
              "price": 29.99,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "a55111fb-1928-4d7f-f523-e06a2aba1a67",
          "name": "Soup",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 23,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "a252c764-697a-47a4-a60d-45942b7849f4",
              "name": "Clam Chowder",
              "merchantId": "lpfishwildrwc22",
              "reference": "35",
              "price": 4.95,
              "isAuxiliary": false
            }, {
              "id": "1f45ce0c-d425-4d2c-df8b-6e6806fca8a8",
              "name": "Mahi Burger Combo ",
              "merchantId": "lpfishwildrwc22",
              "reference": "235",
              "price": 9.50,
              "isAuxiliary": false
            }, {
              "id": "031f19f5-5f80-40f6-aed1-aeb39a953905",
              "name": "Mahi Burger ",
              "merchantId": "lpfishwildrwc22",
              "reference": "236",
              "price": 6.95,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "79aa1bb0-b0c8-4429-c0a7-f4d1f1e2b969",
          "name": "Bowl Specials ",
          "description": "Comes with white rice and steamed veggies.",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 24,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "d4b8ce3c-cb6f-477b-fc74-f16f1fa52d61",
              "name": "Salmon Bowl",
              "merchantId": "lpfishwildrwc22",
              "reference": "107",
              "price": 6.49,
              "isAuxiliary": false
            }, {
              "id": "ca5726ee-854e-4015-e428-8edffdfb9a0f",
              "name": " Chicken Bowl",
              "merchantId": "lpfishwildrwc22",
              "reference": "108",
              "price": 6.49,
              "isAuxiliary": false
            }, {
              "id": "3d682f38-64cb-4908-9de7-0fb69dead2af",
              "name": "Katsu Bowl",
              "merchantId": "lpfishwildrwc22",
              "reference": "110",
              "price": 6.49,
              "isAuxiliary": false
            }, {
              "id": "4fcdf419-ada7-46ec-ef8c-7cbedef87591",
              "name": "Tilapia Bowl",
              "merchantId": "lpfishwildrwc22",
              "reference": "219",
              "price": 6.49,
              "isAuxiliary": false
            }, {
              "id": "edb384c9-3e3f-46fb-bbf7-5a172776cc1e",
              "name": "Fried Shrimp Bowl ",
              "merchantId": "lpfishwildrwc22",
              "reference": "109",
              "price": 6.49,
              "isAuxiliary": false
            }, {
              "id": "1ff1a1c2-db83-4979-9d55-f6997ba2bc6a",
              "name": "Veggie Bowl",
              "merchantId": "lpfishwildrwc22",
              "reference": "229",
              "price": 6.49,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "8685bfb0-c1de-481e-81c1-577d11dc480a",
          "name": "Kid's Menu",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 25,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "523b1e9c-5f81-4096-ba92-57d89df27042",
              "name": "Kid Salmon",
              "merchantId": "lpfishwildrwc22",
              "reference": "122",
              "price": 5.95,
              "isAuxiliary": false
            }, {
              "id": "1d4c7c64-de83-4797-e29e-b60576aa9681",
              "name": "Mini Fish & Chips ",
              "merchantId": "lpfishwildrwc22",
              "reference": "123",
              "price": 5.95,
              "isAuxiliary": false
            }, {
              "id": "488e73d6-5c29-4890-e284-a27e09cc5be5",
              "name": "Island Nugget",
              "merchantId": "lpfishwildrwc22",
              "reference": "124",
              "price": 5.95,
              "isAuxiliary": false
            }, {
              "id": "c8158fc6-91f6-4387-93f1-f07cb5d29a23",
              "name": "Kid's Popcorn Shrimp",
              "merchantId": "lpfishwildrwc22",
              "reference": "125",
              "price": 5.95,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "2aa9a8b0-77c5-4d91-8fa0-0eaf4aa7e0b2",
          "name": "Drinks",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 26,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "18c7cb37-06b0-4ee7-f034-608aee47a73e",
              "name": "Soda",
              "description": "One size fountain soda, free refills",
              "merchantId": "lpfishwildrwc22",
              "reference": "42",
              "price": 1.99,
              "isAuxiliary": false
            }, {
              "id": "f73899d6-3339-4274-d202-421b6024e5f0",
              "name": "Coke Bottle",
              "merchantId": "lpfishwildrwc22",
              "reference": "212",
              "price": 2.25,
              "isAuxiliary": false
            }, {
              "id": "b05f3811-5db2-4055-d7d4-53e31beac0d8",
              "name": " Dasani Water",
              "merchantId": "lpfishwildrwc22",
              "reference": "213",
              "price": 2.25,
              "isAuxiliary": false
            }, {
              "id": "a2f3e3e4-a1bb-4c9b-db6f-98d45598c597",
              "name": "Nestle Water",
              "merchantId": "lpfishwildrwc22",
              "reference": "214",
              "price": 1.99,
              "isAuxiliary": false
            }, {
              "id": "9cfd8130-4de5-45b0-cb5c-af4edb97d4a2",
              "name": "Vitaminwater",
              "merchantId": "lpfishwildrwc22",
              "reference": "215",
              "price": 2.25,
              "isAuxiliary": false
            }, {
              "id": "6a1439a2-b22c-4d7f-be19-23482ad79361",
              "name": "Energy drink",
              "merchantId": "lpfishwildrwc22",
              "reference": "216",
              "price": 2.25,
              "isAuxiliary": false
            }, {
              "id": "b2558aa3-8c2a-4470-d031-1ede5274e2e5",
              "name": "$5.00",
              "merchantId": "lpfishwildrwc22",
              "reference": "115",
              "price": 2.25,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "df25e485-cca0-455d-b052-92877889dcdc",
          "name": "Daily Special",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 28,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "4f5dfcb9-62cc-43e6-a3ea-2d54373a8242",
              "name": "Calif  Sea Bass  Tue",
              "merchantId": "lpfishwildrwc22",
              "reference": "252",
              "price": 9.95,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "dccff01d-92dc-4266-c416-ab67a3feb0e5",
          "name": "Extra ",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 36,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "5efd794c-668d-44f3-c7e5-23a1bf6e301b",
              "name": "Extr Sauce",
              "merchantId": "lpfishwildrwc22",
              "reference": "202",
              "price": 0.46,
              "isAuxiliary": false
            }, {
              "id": "29f4d2fe-6f3b-4f2f-bfe6-8ac7b2bae642",
              "name": "Extra Dressing",
              "merchantId": "lpfishwildrwc22",
              "reference": "203",
              "price": 0.46,
              "isAuxiliary": false
            }, {
              "id": "729a685e-f877-4cac-8687-9b95548dd35f",
              "name": "Tortilla",
              "merchantId": "lpfishwildrwc22",
              "reference": "224",
              "price": 0.50,
              "isAuxiliary": false
            }]
          }
        }, {
          "id": "1c220ffb-6833-41f8-e964-d1b439d7cae2",
          "name": "Desserts",
          "description": "",
          "merchantId": "lpfishwildrwc22",
          "sessionId": "183d392e-c3ec-4fb6-cd0d-aab32b9d436a",
          "lineNo": 37,
          "subCategories": {
            "category": []
          },
          "products": {
            "product": [{
              "id": "98bb60fd-178b-40cb-c5d2-ac47e65e8057",
              "name": "NY Style Cheesecake",
              "merchantId": "lpfishwildrwc22",
              "reference": "176",
              "price": 4.50,
              "isAuxiliary": false
            }, {
              "id": "9b704032-550d-4466-d496-77d23c699379",
              "name": "Vanilla Bean  Ice Cream",
              "merchantId": "lpfishwildrwc22",
              "reference": "177",
              "price": 3.50,
              "isAuxiliary": false
            }, {
              "id": "3d9cb469-e1c3-479d-d238-c03c6ab9ee62",
              "name": "Green Tea Ice Cream",
              "merchantId": "lpfishwildrwc22",
              "reference": "179",
              "price": 3.50,
              "isAuxiliary": false
            }, {
              "id": "4f487a9f-a0cc-4b7d-9e08-69ad3a15ecb4",
              "name": "Three Flavor  Ice Cream",
              "merchantId": "lpfishwildrwc22",
              "reference": "180",
              "price": 3.50,
              "isAuxiliary": false
            }]
          }
        }]
      }
    };
    res.json(data.categories.category);
  });

  app.get('/*', function(req, res) {
    res.render('index');
  });
});
