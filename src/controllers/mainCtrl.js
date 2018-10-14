define(['app', 'angular', 'css!/src/css/main'], function (app, angular) {
  'use strict';
  app.ctrl('mainCtrl', ["$scope", "$rootScope", "publicVal", "queryClassify", "$timeout", "soilDemand", "njwAlert", "getNews", "soil","parseLandInfo",
    function ($scope, $rootScope, publicVal, queryClassify, $timeout, soilDemand, njwAlert, getNews, soil,parseLandInfo) {
      // console.log(require.pathFromUrl('../css/main.css'))
      //$state.transitionTo("main.index")

      $scope.sliderList = [
        {img: "static/images/banner0.jpg", url: "#some"},
        {img: "static/images/banner1.jpg", url: "#some"},
        {img: "static/images/banner2.jpg", url: "#some"}
      ];

      $scope.landRentList = [
        {
          title: "清新区石潭镇185亩超优质连片水田出租",
          url: "#/landInfo/1",
          icon: "/static/images/282x210.jpg",
          flags: ["出租仓库用地", "出租"],
          area: "96亩",
          price: "900元/亩/年",
          address: "清远市清新区"
        }
      ];
      soil.findSoil({}, 1, 4)
        .then(function (res) {
          $scope.landRentList = parseLandInfo(res.list);

        }, function (err) {
          njwAlert.wrong("ajax请求数据列表出错，请重试！");
        });

      $scope.landLookList = [
        {
          title: "按需找地",
          url: "#some",
          icon: "/static/images/282x210.jpg",
          info: "青龙养鸡场项目"
        },
        {
          title: "按需找地",
          url: "#some",
          icon: "/static/images/282x210.jpg",
          info: "青龙养鸡场项目"
        }, {
          title: "按需找地",
          url: "#some",
          icon: "/static/images/282x210.jpg",
          info: "青龙养鸡场项目"
        }, {
          title: "按需找地",
          url: "#some",
          icon: "/static/images/282x210.jpg",
          info: "青龙养鸡场项目"
        }
      ];

      getNews.mainPage()
        .then(function (res) {
          var landNews = [];
          landNews.push({
            list: (function () {
              var list = [];
              angular.forEach(res.cqlz, function (_d, i) {
                if (i !== 0) {
                  list.push({
                    title: _d.infoTitle,
                    date: _d.updateDate,
                    url: 'http://www.nongj.com/info/infoContent?id=' + _d.infoId
                  });
                }

              });
              return list;
            })(),
            img: (function () {
              var li = res.cqlz[0], img;
              img = {
                img: "http://static.nongj.com/" + li.recommendImgUrl,
                title: li.infoTitle,
                url: 'http://www.nongj.com/info/infoContent?id=' + li.infoId
              };

              return img;
            })(),
            caption: {
              title: "土地流转",
              url: "/#/news"
            }
          });

          landNews.push({
            list: (function () {
              var list = [];
              angular.forEach(res.zwdt, function (_d, i) {
                if (i > 0 && i < 3) {
                  list.push({
                    title: _d.infoTitle,
                    date: _d.createDate,
                    url: 'http://www.nongj.com/info/infoContent?id=' + _d.infoId
                  });
                }

              });
              angular.forEach(res.xztz, function (_d, i) {
                if (i < 3) {
                  list.push({
                    title: _d.infoTitle,
                    date: _d.createDate,
                    url: 'http://www.nongj.com/info/infoContent?id=' + _d.infoId
                  });
                }

              });
              return list;
            })(),
            img: (function () {
              var li = res.zwdt[0], img;
              img = {
                img: "http://static.nongj.com/" + li.recommendImgUrl,
                title: li.infoTitle,
                url: 'http://www.nongj.com/info/infoContent?id=' + li.infoId
              };

              return img;
            })(),
            caption: {
              title: "国家政策",
              url: "/#/news"
            }
          });

          $scope.landNews = landNews;
        });

      // $scope.landNews = [
      //   {
      //     list: [
      //       {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
      //       {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
      //       {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
      //       {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"}
      //     ],
      //     img:{
      //       img: "/static/images/370x252.jpg",
      //       title: "开展2017年度金融支农服务创新试点开展2017年度金融",
      //       from: "农业部",
      //       url: "#some"
      //     },
      //     caption:{
      //       title:"土地流转",
      //       url:"/#/news"
      //     }
      //
      //   },
      //   {
      //     list: [
      //       {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
      //       {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
      //       {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
      //       {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"}
      //     ],
      //     img:{
      //       img: "/static/images/370x252.jpg",
      //       title: "开展2017年度金融支农服务创新试点开展2017年度金融",
      //       from: "农业部",
      //       url: "#some"
      //     },
      //     caption:{
      //       title:"国家政策",
      //       url:"/#/news"
      //     }
      //   }
      // ];


    }]);

});