'use strict' ;
/**
*@function
* set the instance method in Date constructor.
*/
module.exports = function () {
  /**Set the instance mathod to get the date on fotmat correct */
  Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return (dd[1]?dd:'0'+dd[0])+'/'+(mm[1]?mm:'0'+mm[0]) + '/'+yyyy; // padding
  };
}
