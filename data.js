'use strict';
var fs = require('fs'),
    run  = require('comandante') ,
    fitmodel = require('./fit_model');
var bestfit = require('nsolvejs').fit.best;
var ls = run('ls',['./data']);
/**@desc
* The datas on data folder are readed
* then for every set of datas into the files fits
* are builded and saved into de DB
*/
ls.stdout.on('data', function(files) {
  files.toString().split('\n').forEach(function (file) {
    /**For every file into de data folder is readed the data*/
    if (!file) {return ;}
    var text = fs.readFileSync('./data/'+file,'utf8'),
    lines = text.split('\n'),
    data = lines.map(function (line) {
    line = line.split('\t');
    var parse = function (item) {
        return parseFloat(item);
    };
    line = line.map(parse);
    return   line ;
    });
    /**the data are generated*/
    data=data.slice(1,data.length-1);
    var l = data[0].length, fit;
    var callback = function (error, created) {
      if (error) {
        console.log('error:',error);
      }
      console.log('created',created);
    };
    for (var i = 1; i < l ; i++) {
      /**The fits are generated using the firts column vs rest columns*/
       fit = bestfit(data,{using : [0,i],fits_name : ['sqrt']});
       var sex = /boy/.test(file) ? 'boy' : 'girl',
       datafile = file+'_'+i;
       /** The fits are saved into DB*/
       fitmodel.create({
         sex:sex,
         datafile: datafile,
         fit:{
           f :
           '('+fit.fitFunction+')',
           used:fit,
           date_upgraded : Date.now() },
         data : {
           used:data,
           date_upgraded : Date.now() } },
        callback );
    }
  });
});
