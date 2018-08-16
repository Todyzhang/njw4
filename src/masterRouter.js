'use strict';
define(['app'], function (app) {
  return ["$stateProvider","MENUS","ENDMENUS",function ($stateProvider,MENUS,ENDMENUS) {
    $stateProvider
      .state('login', {
        url: '/login',//涉农服务
        templateUrl: app.fileUrlHash('/src/pages/login.html'),
        controller: 'loginCtrl',
        resolve: app.loadJs('/src/controllers/loginCtrl.js'),
        data:{
          isLoginPage:true
        }
      })
      .state('agroService', {
        url: '/agro-service',//涉农服务
        templateUrl: app.fileUrlHash('/src/pages/agroService.html'),
        controller: 'agroServiceCtrl',
        resolve: app.loadJs('/src/controllers/agroServiceCtrl.js'),
        data:{
          menu:MENUS["agroService"].id
        }
      })
      .state("landInfo", {
        url: "/landInfo/:id",//地块详情页
        templateUrl: app.fileUrlHash("/src/pages/findland.info.html"),
        controller: "findLandInfoCtrl",
        resolve: app.loadJs("/src/controllers/findLandInfoCtrl.js"),
        data:{
          menu:MENUS["findland"].id
        }
      })
      .state("financial", {
        url: "/financial",//金融服务
        templateUrl: app.fileUrlHash("/src/pages/financial.html"),
        controller: "financialCtrl",
        resolve: app.loadJs("/src/controllers/financialCtrl.js"),
        data:{
          menu:MENUS["financial"].id
        }
      })
      .state("end", {
        url: "/end",//发布平台
        abstract:true,
        templateUrl: app.fileUrlHash("/src/pages/end.html"),
        controller: "endCtrl",
        resolve: app.loadJs("/src/controllers/endCtrl.js")
      })
      .state("end.addLand", {
        url: "^/addLand",//新增土地资源
        data:{
          endMenu1:ENDMENUS["end.addLand"].pid||ENDMENUS["end.addLand"].index,
          endMenu2:ENDMENUS["end.addLand"].id
        },
        views:{
          "end-main":{
            templateUrl: app.fileUrlHash("/src/pages/land.add.html"),
            controller: "landAddCtrl",
            resolve: app.loadJs("/src/controllers/landAddCtrl.js")
          },
          "end-footer-btns":{
            template: '<div class="end-main-footer tc"><a class="btn btn-deeper height-line-40 border-radius-20 pos-re w200" ng-click="submitBtn()">提交审核</a></div>',
            controller: ["$scope",function ($scope) {
              $scope.submitBtn=function () {
                var btnFn=$scope.$parent.alternation.addLand;
                btnFn&&btnFn();
              }
            }]
          }
        }
      })
      .state("end.msgCenter", {
        url: "^/msgCenter",//消息中心
        data:{
          endMenu1:ENDMENUS["end.msgCenter"].pid||ENDMENUS["end.msgCenter"].index,
          endMenu2:ENDMENUS["end.msgCenter"].id
        },
        views:{
          "end-main":{
            template: '<h1>消息中心</h1>',
            // controller: "landAddCtrl",
            // resolve: app.loadJs("/src/controllers/landAddCtrl.js")
          }
        }
      })
  }];
});