'use strict';

var config = require('./config'),
    debug = require('./debug'),
    mongoose = require('mongoose'),
    P = require('bluebird');

// Promisify mongoose with Bluebird
P.promisifyAll(mongoose);

// Connect to mongo by url
mongoose.connect(config.mongo.url);

// Events
mongoose.connection.on('error', debug.database.error);
mongoose.connection.once('open', function () {
  debug.database.info('Mongo connected to ' + config.mongo.url);
});

module.exports = mongoose;
