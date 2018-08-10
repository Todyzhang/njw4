define(['app'], function (app) {
  'use strict';
  app
    .service("fetch", ["$http", "$q", '$location', '$rootScope',"publicVal",
    function ($http, $q, $location, $rootScope,publicVal) {
      var _ajax = function (type, requestUrl, data) {
        var dtd = $q.defer();
        jQuery.support.cors = true;
        jQuery.ajax({
          type: type,
          url: publicVal.severHost+requestUrl,
          crossDomain: true,
          async: true,
          xhrFields: {
            withCredentials: true
          },
          "cache": false,
          data: data ? JSON.stringify(data) : '',
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/html;charset=utf-8");
          }
        }).done(function (_data) {

          if (typeof(_data) === "string") _data = JSON.parse(_data);
          if (_data.success) {
            dtd.resolve(_data.t||_data);
          } else {

            dtd.reject(_data.errorMessage);
          }
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
    .factory("uploadImg", ["$http", "$q", "publicVal","njwCookie", function ($http, $q, publicVal,njwCookie) {
      //上传图片
      var uploadImg = function (form) {
        var dtd = $q.defer();
        var isIE89 = window.FormData ? "" : {"Ie8or9": publicVal.frontHost + "proxy.html"};
        jQuery(form).ajaxSubmit({
          url: publicVal.severHost + "fileUpload/imgUpload.action" + njwCookie.getCookie("ssid"),
          type: 'post',
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          data: isIE89,
          success: function (_d) {
            if (typeof(_d) == "string") {
              if(isIE89){
                _d=decodeURIComponent(_d);
              }
              _d = JSON.parse(_d);
              if (typeof(_d) == "string") _d = JSON.parse(_d);
            }
            dtd.resolve(_d);
          },
          error: function (e) {
            dtd.reject("上传文件出错");
          }
        });

        return dtd.promise;
      };

      return {
        upload: uploadImg
      };
    }])
    //查找各分类接口
    .factory("queryClassify",["fetch",function (fetch) {
      var _path="ManagementTypes/";
      //根据区域id得到该地区下的所有子地区集.为“0”则是顶级父集，即得到所有省份
      function getArea(id) {
        return fetch.get(_path+"area/queryAreaList/"+(id||0)+".action");
        // return fetch.get('http://yfb-nonjiayi.nongj.com/')
      }
      //根据土地类型得到该土地的所有分类.为 0 时得到一级分类
      function getLand(id) {
        return fetch.get(_path+"querySoilTypes/list/"+(id||0)+".action");
      }
      //经营分类
      function getStair(id) {
        return fetch.get(_path+"secondStair/list/"+(id||0)+".action");
      }

      return {
        getArea: getArea,
        getLand:getLand,
        getStair:getStair
      };
    }])


});