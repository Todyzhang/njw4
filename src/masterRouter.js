'use strict';
define(['app'], function (app) {
  return function ($stateProvider) {
    var modulePath = './01-master/';
    $stateProvider
      .state('agroService', {
        url: '/agro-service',
        templateUrl: '/src/pages/agroService.html',
        controller: 'agroServiceCtrl',
        resolve: app.loadJs('/src/controllers/agroServiceCtrl.js')
      })

  };
});