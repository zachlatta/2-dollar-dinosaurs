#!/bin/sh

createAcc() {
  curl https://api1.leapset.com/api-v2/service/customer -X PUT \
    -H "User-Agent: Android-Consumer-Application" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Accept-Encoding: gzip" \
    -H "content-md5: c9e8a0668884525e9d37dc2dc6e2f271" \
    -H "CLIENT: android" \
    -H "VERSION: 1.5" \
    -H "DEVICE_TOKEN: " \
    -H "TIMEZONE: GMT" \
    -H "Authorization: MWS=android_user:ZGjuD3C7aeFxJGMEKrXp1mD5N1g=:1426388283917" \
    --data '{"email":"325@foobarfoobar.com","rewardsNotification":true,"userName":"325@foobarfoobar.com","firstName":"Max","password":"foobarfoobar1","eReceiptNotification":true,"creditCards":{"creditCard":[]},"sendMail":true,"contacts":{"contact":[{"phone":{"subscriberNumber":"1235","areaCode":"325","exchangeCode":"328"}}]}}'
}

getMerchants() {
  curl 'http://api1.leapset.com/api-v2/service/search/merchants?includeImages=true&sort=MERCHANT_NAME&recs=25&page=1&sortOrder=ASC' \
    -H "User-Agent: Android-Consumer-Application" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Accept-Encoding: gzip" \
    -H "content-md5: d41d8cd98f00b204e9800998ecf8427e" \
    -H "CLIENT: android" \
    -H "VERSION: 1.5" \
    -H "DEVICE_TOKEN: " \
    -H "TIMEZONE: GMT" \
    -H "Authorization: MWS=yoo@foobarfoobar.com:Jgez8lbaIiqkYvTFarcQynsJJXs=:1426391361896"
}

getMerchants
