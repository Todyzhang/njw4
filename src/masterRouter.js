'use strict';
define(['app'], function (app) {
  return function ($stateProvider) {
    var modulePath = './01-master/';
    $stateProvider
      .state('main.userMng', {
        url: '/users',
        templateUrl: modulePath + 'users.html',
        controller: 'usersCtrl',
        resolve: app.loadJs([modulePath + 'usersCtrl.js'])
      })
      .state('main.roleMng', {
        url: '/roles',
        templateUrl: modulePath + 'roles.html',
        controller: 'rolesCtrl',
        resolve: app.loadJs([modulePath + 'rolesCtrl.js'])
      })
      .state('main.authMng', {
        url: '/auth',
        templateUrl: modulePath + 'auth.html',
        controller: 'authCtrl',
        resolve: app.loadJs([modulePath + 'authCtrl.js'])
      })
      .state('main.setting', {
        url: '/setting',
        templateUrl: modulePath + 'setting.html',
        controller: 'settingCtrl',
        resolve: app.loadJs([modulePath + 'settingCtrl.js'])
      })
      .state('main.whsMng', {
        url: '/whs',
        templateUrl: modulePath + 'whs.html',
        controller: 'whsCtrl',
        resolve: app.loadJs([modulePath + 'whsCtrl.js'])
      })
      .state('main.matsMng', {
        url: '/mats',
        templateUrl: modulePath + 'mats.html',
        controller: 'matsCtrl',
        resolve: app.loadJs([modulePath + 'matsCtrl.js'])
      })
      .state('main.suppliersMng', {
        url: '/suppliers',
        templateUrl: modulePath + 'suppliers.html',
        controller: 'suppliersCtrl',
        resolve: app.loadJs([modulePath + 'suppliersCtrl.js'])
      })
      .state('main.customersMng', {
        url: '/customers',
        templateUrl: modulePath + 'customers.html',
        controller: 'customersCtrl',
        resolve: app.loadJs([modulePath + 'customersCtrl.js'])
      });
  };
});