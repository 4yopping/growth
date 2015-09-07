'use strict';
/**@function
 * Add the data if is necessary so N is the number of data.
 * @param {array} data {number} N {object} data_ref.
 * @return {array} with the data added.
*/
module.exports = function (thing,N, data_ref) {
    /**if the data given just is one, the data from data_ref
    * are added*/
    var necessary = N-thing.data.length;
    if(necessary>0 ){
      var x_n = Math.round(thing.data[0][0]),y_n=thing.data[0][1];
      var l = data_ref[x_n.toString()].length,y;
      var closer = 0, d_closer = Math.abs(data_ref[x_n.toString()][0]-y_n),d_close;
      for (var i = 1; i < l; i++) {
        y=data_ref[x_n][i];
        d_close =Math.abs(y-y_n);
        if(d_close <= d_closer){ closer = i;}
      }
      var j=1,n,data_topush ,
      a = necessary> 1 ?
      ( Object.keys(data_ref).length-2)/(necessary-1):
      (Object.keys(data_ref).length-1)/2,
      b = necessary> 1 ? 1- a: 0;
      while (j<= necessary) {
      n = Math.round(a*j+b);
      data_topush = [n,data_ref[n][closer]];
      thing.data[thing.data.length] =data_topush;
      j++;
      }
    }
    return thing.data;
};
