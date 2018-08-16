define(['app','angular','css!/src/css/login'], function (app,angular) {
  'use strict';
  app.ctrl('loginCtrl', ["$scope","$rootScope", "$state","publicVal","njwCookie",function ($scope,$rootScope, $state,publicVal,njwCookie) {
    var rebackUrl="#/main";
    $scope.title="登录";

    angular.element("#snLogin").attr("src",publicVal.loginHost);

    //设置一级域名的domain
    document.domain=njwCookie.getDomain();

    window.loginSuccessJump=function(){
      $state.go($rootScope.loginRebackUrl)
    }


  }])
});