define(['app'], function (app) {
  'use strict';
  app
    /*日期过滤器保留年月日*/
    .filter('njyDate', function () {
      return function (value) {
        return value.match(/(\d{4})-(\d{2})-(\d{2})/)[0];
      };
    })
    /*把电话号码中间4位换成'***' */
    .filter('njwNumSer',function () {
      return function (value) {
        return value.replace(/(\d{3})(\d{4})(\d{4})/,"$1***$3");
      }
    })


});