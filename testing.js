'use strict';
var oms_model = require('./oms_model'),
asyncc    = require('async');
var sinon = require('sinon');
var grow = require('./bestfit');
var baby = {
            key  : '55df942c909e10f84b407800',
            vs : 'wfa',
            sex : 'boy',
            data     : [[0,5]],
            upgrade  : true,
            ofX      : [23],
            ofY      : [15]
          } ;
  var callback = function (done) {
    console.log('done=',done.upgrade);
    return;
  } ;
  var options = {smoothing       : true,
            noiseeliminate  : true,
            smoothingmethod :'exponential',
            alpha : 0.8,
            fits_name       :['sqrt'],
            model :require('./growthfit_model'),
            data_ref : {},
            min_data : 10};
var spy = sinon.spy();
oms_model.find({vs : baby.vs, sex : baby.sex}).select('data').exec(function (error,data) {
if(error){console.log('error=',error);}
  var data_ref = {};
  data.forEach(function(item) {
    data_ref[item.data.time] = item.data.measure;
    options.data_ref = data_ref;
  });
asyncc.series([function (cb) {
grow(baby,options, callback);
console.log('termino el primero');
cb(null,'uno');
}],function (error,results) {
  console.log('results=',results);
});
});
