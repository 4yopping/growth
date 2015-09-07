'use strict';

var grow = require('./fitofgrowth');
var baby = {
            Baby_id  : '55df942c909e10f84b407800',
            vs : 'wfa',
            sex : 'boy',
            data     : [[0,5]],
            upgrade  : true,
            ofX      : [23],
            ofY      : [15]
          } ;
  grow(baby,function (done) {
    console.log('done=',done.upgrade,'fit=',done.fit);
    return;
  });
