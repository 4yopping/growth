'use strict';
var
     debug = require('debug')('growth'),

     fit_model = require('./fit_model');
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


  module.exports = function (thing) {
            /**if the data given just is one, the data from OMS
            * are added*/
            if(thing.data.length ===1){
              debug('not fitfound and length ===1');
              /** The fits is looking from the sex and data type*/
              fit_model.$where('/'+thing.vs+'/.test(this.datafile)').find({sex : thing.sex},
              function(error_finding, fits_oms_found) {
                if (error_finding) { return;}
                var equationFit = fits_oms_found[0].fit.used.fitParamsUsed;
                var closer,d_closer,d_close ;
                closer = 0 ;
                var h = eval(fits_oms_found[0].fit.f);
                /**Calculate distance closer*/
                d_closer =Math.abs(h(thing.data[0][0])-thing.data[0][1] )  ;
                var f;
                /**Look for fits more close*/
                fits_oms_found.forEach(function (item,index) {
                  equationFit = item.fit.used.fitParamsUsed;
                  f = eval(item.fit.f);
                  d_close =  Math.abs(f(thing.data[0][0])-thing.data[0][1] )  ;
                  if (d_close <= d_closer) {
                    d_closer  = d_close ;
                    closer    = index ;
                  }
                });
                var length = fits_oms_found[closer].data.used.length -1,
                indexdata = fits_oms_found[closer].datafile.slice(-1),
                firstdata = [fits_oms_found[closer].data.used[0][0],fits_oms_found[closer].data.used[0][indexdata]],
                lastdata= [fits_oms_found[closer].data.used[length][0],fits_oms_found[closer].data.used[length][indexdata]];
                thing.data = [thing.data[0],firstdata,lastdata];
              });
              return thing.data ;
            }
            return thing.data;
        };
