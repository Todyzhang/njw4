'use strict';
define(['app'], function (app) {
  return ["$stateProvider","MENUS",function ($stateProvider,MENUS) {
    $stateProvider
      .state('agroService', {
        url: '/agro-service',//涉农服务
        templateUrl: app.fileUrlHash('/src/pages/agroService.html'),
        controller: 'agroServiceCtrl',
        resolve: app.loadJs('/src/controllers/agroServiceCtrl.js'),
        data:{
          menu:MENUS["agroService"].index //头部没有激活菜单项则设-1
        }
      })
      .state("landInfo", {
        url: "/landInfo/:id",//地块详情页
        templateUrl: app.fileUrlHash("/src/pages/findland.info.html"),
        controller: "findLandInfoCtrl",
        resolve: app.loadJs("/src/controllers/findLandInfoCtrl.js"),
        data:{
          menu:MENUS["findland"].index
        }
      })
      .state("financial", {
        url: "/financial",//金融服务
        templateUrl: app.fileUrlHash("/src/pages/financial.html"),
        controller: "financialCtrl",
        resolve: app.loadJs("/src/controllers/financialCtrl.js"),
        data:{
          menu:MENUS["financial"].index
        }
      })
      .state("end", {
        url: "/end",//发布平台
        templateUrl: app.fileUrlHash("/src/pages/end.html"),
        controller: "endCtrl",
        resolve: app.loadJs("/src/controllers/endCtrl.js"),
        data:{
          menu:-1
        }
      })
      // .state("end.landS", {
      //   url: "/end",//发布平台
      //   templateUrl: app.fileUrlHash("/src/pages/end.html"),
      //   controller: "endCtrl",
      //   resolve: app.loadJs("/src/controllers/endCtrl.js"),
      //   data:{
      //     menu:-1
      //   }
      // })
  }];
});