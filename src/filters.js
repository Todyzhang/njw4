define(['app'], function (app) {
  'use strict';
  app
    /*日期过滤器保留年月日*/
    .filter('YDM_Date', function () {
      return function (value) {
        var reg=/\d{4}.\d{2}.\d{2}./,val=value.match(reg);
        return (val&&val[0])||value;
      };
    })
    /*把电话号码中间4位换成'***' */
    .filter('njwNumSer',function () {
      return function (value) {
        return value.replace(/(\d{3})(\d{4})(\d{4})/,"$1***$3");
      }
    })


});