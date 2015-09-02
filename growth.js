'use strict';

var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

/**
 * Growth
 *
 * @function
 * @param {Object} options - Options
 * @param {Object} options.mongo - Mongo Config
 * @param {string} options.mongo.db - Mongo Database
 * @param {string} options.mongo.host - Mongo Host
 * @param {string} options.mongo.user - Mongo User
 * @param {string} options.mongo.pass - Mongo Password
 */
var Growth = function (options) {
  options = options || {};

  this.mongo = options.mongo;
  this.model = mongoose.model('Growthfit', new Schema({
    key: { type: String, required: true, index: { unique: true } },
    fit: { used: Object,  date_upgraded: { type: Date, default: Date.now }} ,
    data: { used: Object,  date_upgraded: { type: Date, default: Date.now }} ,
  }));
};


module.exports = Growth;
