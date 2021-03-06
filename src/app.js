"use strict";
//app.js模块就是angular定义的主模块（只负责定义，设置provider代理供其他辅助模块使用），设置必要的拦截器，例如请求中添加token令牌、返回后调用Service的预处理等。
define(["require", "angular"], function (require, angular) {
  var app = angular.module("App", ["ui.router"]);

  window.jQuery && (jQuery.noConflict(), jQuery.support.cors = true)

  app.factory("interceptor", function ($q) {
    return {
      request: function (config) {
        console.log(config.url);
        if (config.url.indexOf("/login/") === -1) {
          config.headers["token"] = "1234";
        }
        console.log(config.headers);
        return config || $q.when(config);
      },
      response: function (response) {
        if (response.config.url.indexOf("service") > -1) {
          //todo 预处理请求结果
        }
        return response || $q.when(response);
      }
    };
  });

  // app.run(function($rootScope, $location,$state, permissions) {
  //   $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
  //     var permission = toState.permission;
  //     if (toState.name!="login"&&!permissions.hasPermission(permission)) {
  //       // event.preventDefault();
  //       // $state.transitionTo("login");
  //     }
  //   });
  // });

  // app.run(function ($rootScope,$state) {
  //   $rootScope.$on("$stateChangeStart",function(event){
  //     // if(toState.name=="login")return;// 如果是进入登录界面则允许
  //     // 如果用户不存在
  //     if(ifLoginTrue==false){
  //       console.log("没有登录")
  //       event.preventDefault();// 取消默认跳转行为
  //       $("#my-modal-loading").modal("open");//开启加载中loading
  //
  //       // $state.go("login",{from:fromState.name,w:"notLogin"});//跳转到登录界面
  //     }
  //   });
  // });

  app.config(["$controllerProvider", "$provide", "$stateProvider", "$urlRouterProvider", "$httpProvider", "$compileProvider", "$filterProvider",
    function ($controllerProvider, $provide, $stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, $filterProvider) {
      //$provide属性constant decorator factory provider service value
      app.ctrl = $controllerProvider.register;//注册控制器
      app.directive = $compileProvider.directive;//注册指令
      app.service = $provide.service;
      app.factory = $provide.factory;
      app.filter = $filterProvider;
      app.state = $stateProvider.state;

      $httpProvider.interceptors.push("interceptor");

      // 延迟加载方法
      app.loadJs = function (files) {
        return {
          ctrl: ["$q", function ($q) {
            var wait = $q.defer(),
              deps = [];
            angular.isArray(files) ? (deps = files) : deps.push(files);
            require(deps, function () {
              wait.resolve();
            });
            return wait.promise;
          }]
        };
      };
      // console.log(require)
      app.fileUrlHash = function (files) {
        return files + "?" + REQUIRE_CONFIG.urlArgs;
      };

      /*
      app.config(function($stateProvider,$urlRouterProvider) {
      $stateProvider
       .state(
          "states",//一个合法statename,或者父/子state,如"states.home","states.about"
          {
              //template:字符串或函数,路由html模版,如果是函数,那么函数的参数是从当前 `$location.path()`提取到的状态参数
              //templateUrl:字符串或函数.路由模版路径
              //templateProvider:返回HTML字符串的函数
              //controller:我们既可以通过控制器的名字来关联一个预定义的控制器，也可以直接创建一个控制器函数来处理。
              //controllerProvider:一个函数,返回实际控制器
              //controllerAs:控制器别名
              //parent:可选定当前state的父state
              //resolve:{
              //   key:value
              // }为控制器提供可选的依赖对象,key是被注入控制器的依赖的名称,value如果是一个字符串，就试图用这个字符串来匹配当前已经注册的服务名称，如果是一个函数，执行这个函数，返回的值就是依赖。如果函数返回一个 promise，在控制器被实例化之前，将会被 resolved，返回的值被注入到 controller 中。
              //url:带有可选参数的url片段,当一个state被激活,$stateParams服务将被传入的参数填充
              //views:定义视图
              //Params:参数名称或者正则的数组。它不能合并 url 选项，当状态激活的时候，应用会使用这些参数填充 $stateParams 服务。
              //Abstract:我们永远不能直接激活抽象模板，但是，可以通过派生模板来激活.抽象模板提供封装命名视图的模板，可以传递 $scope 对象给派生子模板。可以通过它解决依赖问题，或者特定数据处理，或者简单地同样的 url 来嵌套多个路由
              //onEnter, onExit 在应用进入或者退出视图的时候，会调用这些回调函数。它们都可以设置回调函数；函数可以访问获取的数据。
              //data：数据不会被注入到控制器中，用途是从父状态传递数据到子状态。
          })
        })

       */

      //定义主菜单、默认页
      $stateProvider
        .state("main", {
          url: "/main",
          //abstract: true,
          templateUrl: app.fileUrlHash("./src/pages/main.html"),
          controller: "mainCtrl",
          resolve: app.loadJs("./src/controllers/mainCtrl.js"),
        })
        .state("findland", {
          url: "/findland",
          templateUrl: app.fileUrlHash("./src/pages/findland.html"),
          controller: "findLandCtrl",
          resolve: app.loadJs("./src/controllers/findLandCtrl.js")
        })
        // .state("main.index", {
        //   url: "/index",
        //   templateUrl: app.fileUrlHash("./src/pages/main.index.html"),
        //   controller: "mainIndexCtrl",
        //   resolve: app.loadJs("./src/controllers/mainIndexCtrl.js")
        // })

      // 默认页
      $urlRouterProvider.otherwise("/main");
      $urlRouterProvider.when("","/main");
    }]);


  app.run(["$rootScope", "publicVal", function ($rootScope, publicVal) {
    $rootScope.serverTel = publicVal.serverTel;
    $rootScope.menuList = publicVal.menus;
    $rootScope.menuActive = 0;
    $rootScope.loginMsg={
      name:"18022224312",
      msgNum:"3",
      login:true
    }
  }]);

  app.controller("pageHeaderCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
    $scope.menuClick = function (index) {
      $rootScope.menuActive = index;
    };
    $scope.exitClick = function () {
      //todo
    };
  }]);

  return app;
});