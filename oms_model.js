'use strict';

  var   mongoose      = require('./mongoose');
  var   schema ;
    /** schema of fit. */
  schema =  new  mongoose.Schema({
    sex   : String,
    vs :    String,
    data       : {time : Number, measure : Array}
  });
    /** fit Model */
module.exports = mongoose.model('OMS_data', schema);
