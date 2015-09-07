'use strict';
var fs = require('fs'),
    run  = require('comandante') ,
    async = require('async'),
    omsmodel = require('./oms_model');
var ls = run('ls',['./data']);
/**@desc
* The datas on data folder are readed
* then for every set of datas into the files fits
* are builded and saved into de DB
*/

var cb = function (err) {
  if (err) {console.log('error=',err);return;}
  console.log('done all');
};
var parse = function (item) {
  return parseFloat(item);
};

ls.stdout.on('data', function(files) {
  files.toString().split('\n').forEach(function (file) {
    /**For every file into de data folder is read the data*/
    if (!file) {return ;}
    var text = fs.readFileSync('./data/'+file,'utf8');
    var sex = /boy/.test(file) ? 'boy' : 'girl',
    vs = file.slice(0,file.search('_'));
    var lines = text.split('\r');
    lines = lines.map(function (arg) {
      return arg.split('\n');
    });
    lines = lines.slice(1,lines.length-1);
    var data = lines.map(function (line) {
      console.log('type',line);
      return line[1].split('\t').map(parse);
    });
    data = data.slice(0,data.length-1);
    async.eachSeries(data,function (item,callback) {
      omsmodel.create({sex:sex,
                       vs :vs,
                       data:{time : item[0].toString(), measure : item.slice(1)}      },callback);
    },cb);

  });
});
