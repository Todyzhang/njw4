define(['app'], function (app) {
  'use strict';
  app.service("fetch", ["$http", "$q",  '$location', '$rootScope',
    function ($http, $q, $location, $rootScope) {
      var _ajax = function (type, requestUrl, data) {
        var dtd = $q.defer();

        jQuery.ajax({
          type: type,
          url: requestUrl ,
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
          if (_data.success) {
            dtd.resolve(_data);
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
    }]);


});