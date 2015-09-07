'use strict';
var  bestfit    = require('nsolvejs').fit.best,
     options,fit,ans_ofX,  ans_ofY ,
     debug = require('debug')('growth');
     var upgrade = true,done,
     growthfit = require('./growthfit_model'),
     add_data = require('./add_data');
     require('./date')();

/**@function
 * This function calculate the best fit to the datas given, if no one data is passed, use the fit saved into DB.
 * @param {object} thing {function} cb
 * @namespace thing
 * @property {array}     ofX          - The query  of x.
 * @property {array}     ofY          - The query  of y.
 * @property {object}    data         - Data to be used and added.
 * @property {string}    id           - Id
 * @property {boolean}   upgrade      - If the fits is necessary upgrade.
 * @property {string}    vs           - type od data used(wfa,hlfa, wfh,wfl)
 * @property {boolean}   sex          - If the fits is necessary upgrade.
 * @return {object} with reponses to data given.
 * @namespace done
 * @property {array}     ans_ofX         - The response of x.
 * @property {array}     ans_ofX         - The response  of y.
 * @property {object}    fits            - The fit found.
 * @property {boolean}   upgrade         - If data and fit was saved o created     *                                          successfully
 */


  module.exports = function (thing,cb) {
    if (!thing.Baby_id) { upgrade = false;return ;}
    options ={smoothing       : true,
              noiseeliminate  : true,
              smoothingmethod :'exponential',
              alpha : 0.8,
              fits_name       :['sqrt']
    } ;
    thing.ofX = thing.ofX || [];   thing.ofY = thing.ofY || [];
    var i,l =thing.data.length,prop,data=[],_data ={};
    if (thing.upgrade) {
      growthfit.findOne({Baby_id : thing.Baby_id },
        function (error_finding,fit_found) {
        if (error_finding) {
          upgrade = false;
          return;
        }
        /** If fit is stored then upgraded*/
        if (fit_found) {
          if (!fit_found.data.used){fit_found.data.used={};}
          if (thing.data.length > 0) {
            for (i = 0; i < l; i++) {
              fit_found.data.used[thing.data[i][0].toString()]=[thing.data[i][1],new Date().yyyymmdd() ];
            }
            debug('data_used',fit_found.data.used);
            i=0;
            for (prop in fit_found.data.used ) {
              data[i]=[parseFloat(prop),fit_found.data.used[prop][0]];
              i++;
            }
            debug('data=',data);
            fit_found.data.date_upgraded = Date.now() ;
            fit_found.data = {used          :  fit_found.data.used ,
                              date_upgraded :  fit_found.data.date_upgraded };
            debug('before fit');
            fit = bestfit(data,thing.ofX,thing.ofY,options);
            debug('after fit=',fit);
            ans_ofX = fit.ans_ofX ;
            ans_ofY = fit.ans_ofY ;
            fit_found.fit.date_upgraded = Date.now() ;
            if (!fit_found.fit.used){fit_found.fit.used={};}
            fit_found.fit.used          = fit ;

            fit_found.fit = {used           :  fit_found.fit.used ,
                              date_upgraded :  fit_found.fit.date_upgraded };
            debug('fit_found',fit_found);
            fit_found.save(
              function (error_saving) {
              if (error_saving) { upgrade = false; debug('debug in error_saving');}
              /**
              * This callback is called when the fit is upgraded.
              * @callback calback to upgraded fit.
              * @param {number} responseCode
              */
              done = {ans_ofX   : ans_ofX    ,
                      ans_ofY   : ans_ofY  ,
                      upgrade   : upgrade ,
                      fit       : fit };
              cb(done);
              return;
            });
          } else {
            if (fit_found.fit.used) {
              fit = bestfit(fit_found.fit.used,thing.ofX,thing.ofY,options);
              ans_ofX = fit.ans_ofX ;
              ans_ofY = fit.ans_ofY ;
            }
            /**
            * This callback is called when the fit is upgraded.
            * @callback calback to upgraded fit.
            * @param {number} responseCode
            */
            done = {ans_ofX   : ans_ofX     ,
                    ans_ofY   : ans_ofY     ,
                    upgrade   : upgrade     ,
                    fit       : fit }       ;
            cb(done);
          }
        }else {
            debug('not fit_found');
          if (thing.data.length > 0){
            /**if the data given just is one, the data from OMS
            * are added*/
            thing.data = add_data(thing);
              l = thing.data.length ;
              for (i = 0; i < l; i++) {
                _data[thing.data[i][0].toString()]=[thing.data[i][1],
              new Date().yyyymmdd()  ];
              }
              fit = bestfit(thing.data,thing.ofX,thing.ofY,options);
              ans_ofX = fit.ans_ofX ;
              ans_ofY = fit.ans_ofY ;
              growthfit.create({Baby_id:thing.Baby_id, fit:{used:fit,date_upgraded : Date.now()}, data : {used : _data, date_upgraded :Date.now()  }},
              function (error_creating) {
                if (error_creating) {upgrade = false;}
                /**
                * This callback is called when the fit is upgraded.
                * @callback calback to upgraded fit.
                * @param {number} responseCode
                */
                done = {ans_ofX   : ans_ofX    ,
                        ans_ofY   : ans_ofY   ,
                        upgrade   : upgrade ,
                        fit       : fit };
                cb(done);
                return;
              });
          } else {
            upgrade = true;
            /**
            * This callback is called when the fit is upgraded.
            * @callback calback to upgraded fit.
            * @param {number} responseCode
            */
            growthfit.create({Baby_id:thing.Baby_id, fit:{date_upgraded : Date.now()}, data : {date_upgraded : Date.now() }},
            function (error_creating) {
              if (error_creating) {upgrade = false; return;}
              /**
              * This callback is called when the fit is upgraded.
              * @callback calback to upgraded fit.
              * @param {number} responseCode
              */
              done = {ans_ofX   : ans_ofX    ,
                      ans_ofY   : ans_ofY   ,
                      upgrade   : upgrade ,
                      fit       : fit };
              cb(done);
              return;
            });
          }
        }
      });
    }else {
      upgrade = false ;
      if (thing.data.length > 0){
        fit     = bestfit(thing.data,thing.ofX,thing.ofY,options);
        ans_ofX = fit.ans_ofX ;
        ans_ofY = fit.ans_ofY ;
        /**
        * This callback is called when the fit is upgraded.
        * @callback calback to upgraded fit.
        * @param {number} responseCode
        */
        done = {ans_ofX   : ans_ofX    ,
                ans_ofY   : ans_ofY   ,
                upgrade   : upgrade ,
                fit       : fit };
        cb(done);
        return ;
      }
    }
};
