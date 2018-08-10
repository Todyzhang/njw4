define(['app'], function (app) {
  'use strict';
  app
    .service("fetch", ["$http", "$q", '$location', '$rootScope',"publicVal",
    function ($http, $q, $location, $rootScope,publicVal) {
      var _ajax = function (type, requestUrl, data) {
        var dtd = $q.defer();

        jQuery.ajax({
          type: type,
          url: publicVal.serviceUrl+requestUrl,
          dataType: 'json',
          crossDomain: true,
          async: true,
          xhrFields: {
            withCredentials: true
          },
          "cache": false,
          data: data ? JSON.stringify(data) : '',
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
          }
        }).done(function (_data) {

          if (typeof(_data) === "string") _data = JSON.parse(_data);
          // if (_data.success) {
            dtd.resolve(_data);
          // } else {
          //
          //   dtd.reject(_data.errorMessage);
          // }
        }).fail(function (err) {
          console.log(err)
          dtd.reject("ajax请求出错");
        });
        return dtd.promise;
      };

      return {
        get: function (url, data) {
          return _ajax("GET", url, data);
        },
        post: function (url, data) {
          return _ajax("POST", url, data);
        }
      };
    }])
    //查找各分类接口
    .factory("queryClassify",["fetch",function (fetch) {
      var _path="/ManagementTypes/";
      //根据区域id得到该地区下的所有子地区集.为“0”则是顶级父集，即得到所有省份
      function getArea(id) {
        return fetch.get(_path+"area/queryAreaList/"+(id||0)+".action");
      }
      //根据土地类型得到该土地的所有分类.为 0 时得到一级分类
      function getLand(id) {
        return fetch.get(_path+"querySoilTypes/"+(id||0)+".action");
      }
      //经营分类
      function getStair(id) {
        return fetch.get(_path+"secondStair/list/"+(id||0)+".action");
      }

      return {
        getArea: getArea,
        getLand:getLand,
        getStair:getStair,
      };
    }])


});