define(['app','angular'], function (app,angular) {
  'use strict';
  app.ctrl('loginCtrl', ["$scope","$rootScope", "$state","publicVal","njwCookie","njwUser",function ($scope,$rootScope, $state,publicVal,njwCookie,njwUser) {
    var ifmUrl=publicVal.loginHost,title="登录",height=332;
    if($state.current.name==="logon"){
      ifmUrl+="#logon";
      title="注册";
      height=485;
    }


    $scope.title=title;
    $scope.height=height;
    angular.element("#snLogin").attr("src",ifmUrl);

    //设置一级域名的domain
    document.domain=njwCookie.getDomain();

    //登录成功后的跳转地址
    window.loginSuccessJump=function(){
      // location.href="#"+$rootScope.loginRebackUrl;
      njwUser.setSession()
        .then(function (res) {
          $state.transitionTo($rootScope.loginRebackUrl);
        });
    }


  }])
});