#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));

var program = require('commander');

program
  .version(pkg.version)
  .option('-s --sid [sid]', 'Twilio SID')
  .option('-t --token [token]', 'Twilio auth token')
  .parse(process.argv);

if (!program.sid) {
  console.error('twilio sid is required');
  process.exit(1);
}

if (!program.token) {
  console.error('twilio auth token is required')
  process.exit(1);
}

var twilio = require('twilio')(process.sid, process.token);
