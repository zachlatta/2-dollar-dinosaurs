#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));

var program = require('commander');

program
  .version(pkg.version)
  .parse(process.argv);
