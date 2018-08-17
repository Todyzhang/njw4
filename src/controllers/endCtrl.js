define(['app', 'css!/src/css/end'], function (app) {
  'use strict';
  app.ctrl('endCtrl', ["$scope", "$rootScope",function ($scope, $rootScope) {

    $scope.alternation={};//方便views之间数据交互调用

    $scope.endMenu1Click=function(menu){
      $rootScope.endMenuActive1=menu.index;
    };
    $scope.endMenu2Click=function(menu){
      $rootScope.endMenuActive1=menu.pid;
      $rootScope.endMenuActive2=menu.id;
    }


  }])
});