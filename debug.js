'use strict';

var debug = require('debug');

// Set reporters
var reporters = [
  'com',
  'database',
  'http',
  'socket',
  'papi'
];

// Create debug functions for each reporter
reporters.forEach(function (reporter) {
  module.exports[reporter] = {};
  module.exports[reporter].info = debug(reporter + ':info');
  module.exports[reporter].error = debug(reporter + ':error');
});

module.exports.params = debug('params');

// Usage:
// debug.http.info('Something has happened');
// debug.http.error('An error has occurred');
