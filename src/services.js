define(['app'], function (app) {
  'use strict';
  app
    .service("fetch", ["$http", "$q", '$location', '$rootScope', "publicVal",
      function ($http, $q, $location, $rootScope, publicVal) {
        var _ajax = function (type, requestUrl, data) {
          var dtd = $q.defer(),
            url = (/^http/.test(requestUrl) ? "" : publicVal.severHost) + requestUrl;
          jQuery.ajax({
            type: type,
            url: url,
            dataType:'json',
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
          })
            .done(function (_data) {

              if (typeof(_data) === "string") _data = JSON.parse(_data);
              if (_data.success||(_data.status&&_data.status.toLowerCase()==="success")) {
                dtd.resolve(_data.t || _data.data || _data.content || _data);
              } else {

                dtd.reject(_data.errorMessage);
              }
            })
            .fail(function (err) {
              console.log(err);
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
    .factory("uploadImg", ["$http", "$q", "publicVal", "njwCookie", function ($http, $q, publicVal, njwCookie) {
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
              if (isIE89) {
                _d = decodeURIComponent(_d);
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
    .factory("njwUser", ["fetch","publicVal", function (fetch,publicVal) {
      /*
       {
       "content":{
       "invalidDate":"2016-09-01 11:03:52",
       "openDate":"2016-08-13 11:03:47",
       "userEmail":"284765987@qq.com",
       "userName":"abc12312",
       "userPhone":"18454245634",
       "userType":4 //用户类别 1.个人 2.企业 3.站点服务员 4.业务管理员 7.担保公司
       },
       "errorMessage":"",
       "sessionStatus":0,
       "success":true
       }
       {
       "content":"failed",
       "errorMessage":"sessionId 失效",
       "sessionStatus":-1,
       "success":false
       }
       */
      var host=publicVal.njyEndHost;
      function getCurrentUser() {
        return fetch.get(host+"api/user/user/find/getCurrentUser");
      }
      function logout() {
        return fetch.get(host+"api/sys/login/logout");
      }
      return {
        getCurrentUser: getCurrentUser,
        logout: logout
      };
    }])
    //查找各分类接口
    .factory("queryClassify", ["fetch", function (fetch) {
      var _path = "ManagementTypes/";

      //根据区域id得到该地区下的所有子地区集.为“0”则是顶级父集，即得到所有省份
      function getArea(id) {
        return fetch.get(_path+"area/queryAreaList/"+(id||0)+".action");
        // return fetch.get('http://nonjiayi-end.nongj.com/nonjiayi/api/area/area/find/findByParentId/' + (id || 0));
      }

      //根据土地类型得到该土地的所有分类.为 0 时得到一级分类
      function getLand(id) {
        return fetch.get(_path + "querySoilTypes/list/" + (id || 0) + ".action");
      }

      //经营分类
      function getStair(id) {
        return fetch.get(_path + "secondStair/list/" + (id || 0) + ".action");
      }

      function findSysArea(id) {
        return fetch.post('http://vip.nongj.com/nonjia/news/findSysArea.action',{"areaId":id||0})
      }


      return {
        getArea: getArea,
        getLand: getLand,
        getStair: getStair,
        findSysArea:findSysArea
      };
    }])
    .factory("soilDemand", ["fetch", function (fetch) {
      function addSoil(data) {
        return fetch.post("soilDemand/addSoilDemand.action", data);
      }

      return {
        addSoil: addSoil
      }
    }])
    .factory("soil", ["fetch", function (fetch) {
      function addSoil(data) {
        //新增土地转让
        return fetch.post("/soil/add.action", data);
      }

      function findSoil(data,page,pageSize) {
        return fetch.post("/soil/find.action?page="+page+"&pageSize="+pageSize,data)
      }
      return {
        addSoil: addSoil,
        findSoil:findSoil
      }
    }])
    .factory("getNews", ["fetch", function (fetch) {
      function mainPage() {
        return fetch.post("http://vip.nongj.com/nonjia/news/findInfoTypeAccessToInformationMap.action", {"typeName":"政务动态,行政通知,产权流转","pageSize":6,"attribute":1,"typeCode":"zwdt,xztz,cqlz"});
      }
      function findLandPage() {
        return fetch.post("http://vip.nongj.com/nonjia/news/findInfoTypeAccessToInformationMap.action", {"typeName":"金融资讯,机械化服务,农资农产品,政务动态,行政通知","pageSize":6,"attribute":1,"typeCode":"jyfw,nyds,nznq,zwdt,xztz"});
      }
      return {
        mainPage: mainPage,
        findLandPage:findLandPage
      }
    }])
});