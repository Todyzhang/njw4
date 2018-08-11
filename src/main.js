'use strict';
// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {
  };
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
  if(!("indexOf" in Array.prototype)){
    Array.prototype.indexOf=function (item) {
      var i=0,len=this.length,reback=-1;
      for(;i<len;i++){
        if(this[i]==item){
          reback=i;
          break;
        }
      }
      return reback;
    }
  }
}());

//main.js启动模块，加载所有路由模块，app配置路由后启动App。（以下只定义了master路由模块，实际业务可能分很多模块）
var REQUIRE_CONFIG = {
  // baseURI:"/",
  /*
  RequireJS获取资源时附加在URL后面的额外的query参数。作为浏览器或服务器未正确配置时的“cache bust”手段很有用。使用cache bust配置的一个示例：
  在开发中这很有用，但请记得在部署到生产环境之前移除它。
   */
  urlArgs: "r=" + (+new Date),
  waitSeconds: 0,//在放弃加载一个脚本之前等待的秒数。设为0禁用等待超时。默认为7秒。
  paths: {
    // js
    'jquery': '../static/js/jquery-1.11.1.min',
    'jquery-form': '../static/js/jquery.form',
    'ie8-ajax': '../static/js/jquery.xdomainrequest.min',
    'angular': '../static/js/angular.min',
    'ui-router': '../static/js/angular-ui-router.min',
    'modernizr': '../static/js/modernizr-2.6.2.min',
    'es5-shim': '../static/js/es5-shim.min',
    'app': './app',
    'text': '../static/js/requirejs/text',
    'css': '../static/js/requirejs/css.min',
    'masterRouter':'./masterRouter',

    // css
    'common': './css/common',
    'ie8': './css/ie8',
    'normalize': '../static/css/normalize'
  },
  shim: {
    'jquery-form': {
      deps: ['jquery'],
      exports: 'jquery-form'
    },
    'ie8-ajax': {
      deps: ['jquery'],
      exports: 'ie8-ajax'
    },
    'angular': {
      //指定要加载的一个依赖数组。当将require设置为一个config object在加载require.js之前使用时很有用。一旦require.js被定义，这些依赖就已加载。
      //使用deps就像调用require([])，但它在loader处理配置完毕之后就立即生效。它并不阻塞其他的require()调用，它仅是指定某些模块作为config块的一部分而异步加载的手段而已。
      deps: ['jquery', 'modernizr', 'es5-shim', 'css','ie8-ajax'],
      exports: 'angular'
    },
    'ui-router': {
      deps: ['angular'],
      exports: 'ui-router'
    },
    'app': {
      deps: ['ui-router'],
      exports: 'app'
    }
  },
  // map: {
  //   '*': {
  //     'css': '../static/js/css.min'
  //   }
  // }
};
require.config(REQUIRE_CONFIG);

// 有返回值的写在前面，方便填写注入的参数
require(['app', 'angular','masterRouter','css!normalize', 'jquery', 'jquery-form', 'ui-router', 'css!common','css!/src/css/theme', 'utils', 'services','directives.html.tpl', 'directives', 'filters'],
  function (app,angular,masterRouter) {
    var isIE = function(ver){
      var b = document.createElement('b')
      b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
      return b.getElementsByTagName('i').length === 1
    }
    if(isIE(8)){
      require(['css!ie8']);
    }
    app.config(masterRouter);
    angular.bootstrap(document, ['App']);
    console.log('系统已启动...');
  }
);

/*
require.config({
    baseUrl: "./js",
    urlArgs: new Date().getTime(),
    paths: {
        jquery: "../lib/jquery-2.1.4",
        cookie: "../lib/jquery.cookie",
        text: "../lib/text",
        artTemplate: "../lib/template-web",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        pager: "../assets/jQueryPage/pager",
        //配置模板文件夹的路径
        tpls: "../tpls",
        // 日期控件
        datetimepicker: "../assets/datetimepicker/js/bootstrap-datetimepicker.min",
        clockpicker: "../assets/clockpicker/bootstrap-clockpicker.min",
        daterangepicker: "../assets/daterangepicker/js/daterangepicker",
        moment: "../assets/daterangepicker/js/moment.min",
        datetimepickerLang: "../assets/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
        clipboard: "../lib/clipboard",
//打包入口文件
        entry: "../main"
    },
    // 设置依赖
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepicker: {
            deps: ["moment"]
        },
        clockpicker: {
            deps: ["bootstrap"]
        },
        datetimepickerLang: {
            deps: ["datetimepicker"]
        },
        daterangepicker: {
            deps: ["moment"]
        },
        clipboard: {
            deps: ["jquery"]
        }
    },
//不打包的静态文件
    excludeShallow: [
        'jquery','bootstrap','clockpicker', 'datetimepickerLang', 'clipboard', 'moment', 'datetimepicker', 'daterangepicker'
    ],
    waitSeconds: 0,
    name: "entry",
    out: "./dist/main.js"
});

 */