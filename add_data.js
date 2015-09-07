'use strict';
/**@function
 * Add the data if is necessary so N is the number of data.
 * @param {array} data {number} N {object} data_ref.
 * @return {array} with the data added.
*/
module.exports = function (thing,N, data_ref) {
  console.log('thing.data1 =',thing.data);
    /**if the data given just is one, the data from data_ref
    * are added*/
    var necessary = N-thing.data.length;
    console.log('thing.data2=',thing.data);
    if(necessary>0 ){
      var x_n = Math.round(thing.data[0][0]),y_n=thing.data[0][1];
      var l = data_ref[x_n.toString()].length,y;
      var closer = 0, d_closer = Math.abs(data_ref[x_n.toString()][0]-y_n),d_close;
      console.log('thing.data3=',thing.data);
      for (var i = 1; i < l; i++) {
        y=data_ref[x_n][i];
        d_close =Math.abs(y-y_n);
        if(d_close <= d_closer){ closer = i;}
      }
      console.log('thing.data4=',thing.data);
      var j=1,n,data_topush ,
      a = necessary> 1 ?
      ( Object.keys(data_ref).length-2)/(necessary-1):
      (Object.keys(data_ref).length-1)/2,
      b = necessary> 1 ? 1- a: 0;
      console.log('thing.data5=',thing.data);
      while (j<= necessary) {
      n = Math.round(a*j+b);
      console.log('n=',n,'closer=',closer,'data_ref=',data_ref[n]);
      data_topush = [n,data_ref[n][closer]];
  console.log('data_topush=',data_topush);
      thing.data[thing.data.length] =data_topush;
        console.log('thing.data in while'+j+'=',thing.data);
      j++;
      }
    }
    return thing.data;
};
