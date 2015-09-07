'use strict';

  var   mongoose      = require('../lib/mongoose');
  var   schema ;
    /** schema of fit. */
  schema =  new  mongoose.Schema({
    sex   : String,
    datafile : String,
    fit        : { f : String ,used : mongoose.Schema.Types.Mixed ,  date_upgraded : { type: Date, default: Date.now() }} ,
    data       : { used :Array,  date_upgraded : { type: Date, default: Date.now() }}
  });
    /** fit Model */
module.exports = mongoose.model('fit_OMS', schema);
