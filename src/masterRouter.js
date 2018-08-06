'use strict';
define(['app'], function (app) {
  return function ($stateProvider) {
    var modulePath = './01-master/';
    $stateProvider
      .state('agroService', {
        url: '/agro-service',
        templateUrl: '/src/pages/agroService.html',
        controller: 'agroServiceCtrl',
        resolve: app.loadJs('/src/controllers/agroServiceCtrl.js'),
        data:{
          menu:2
        }
      })
      .state("landInfo", {
        url: "/landInfo",
        templateUrl: app.fileUrlHash("/src/pages/findland.info.html"),
        controller: "findLandInfoCtrl",
        resolve: app.loadJs("/src/controllers/findLandInfoCtrl.js"),
        data:{
          menu:1
        }
      })
  };
});