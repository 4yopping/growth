'use strict';

  var   mongoose      = require('../lib/mongoose');
  var   schema ;
    /** schema of fit. */
  schema =  new  mongoose.Schema({
    Baby_id    :  mongoose.Schema.Types.ObjectId,
    fit        : { used : Object ,  date_upgraded : { type: Date, default: Date.now() }} ,
    data       : { used : Object ,  date_upgraded : { type: Date, default: Date.now() }}
  });
    /** fit Model */
module.exports = mongoose.model('growthfit', schema);
