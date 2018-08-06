define(['app', 'css!/src/css/findland'], function (app) {
  'use strict';
  app.ctrl('findLandInfoCtrl', ["$scope", "$timeout", "Slider", function ($scope, $timeout, slider) {
    var descSlider = {
      sliderId:'slider' + (+new Date),
      imgs: [
        {
          bImg: "/static/images/570x386.jpg",
          sImg: "/static/images/90x62.jpg"
        },
        {
          bImg: "/static/images/570x386.jpg",
          sImg: "/static/images/90x62.jpg"
        },
        {
          bImg: "/static/images/570x386.jpg",
          sImg: "/static/images/90x62.jpg"
        },
        {
          bImg: "/static/images/570x386.jpg",
          sImg: "/static/images/90x62.jpg"
        },
        {
          bImg: "/static/images/570x386.jpg",
          sImg: "/static/images/90x62.jpg"
        }
      ],
      width: 570,
      current: 0
    };
    descSlider.size = descSlider.imgs.length;
    descSlider.lastIndex = descSlider.size - 1;
    descSlider.firstItem = descSlider.imgs[0];
    descSlider.lastItem = descSlider.imgs[descSlider.lastIndex];
    descSlider.totalDis = (descSlider.size + 2) * descSlider.width;

    $scope.landRentList = [
      {
        title: "清新区石潭镇185亩超优质连片水田出租",
        url: "#some",
        icon: "/static/images/282x210.jpg",
        flags: ["出租仓库用地", "出租"],
        area: "96亩",
        price: "900元/亩/年",
        address: "清远市清新区"
      },
      {
        title: "清新区石潭镇185亩超优质连片水田出租",
        url: "#some",
        icon: "/static/images/282x210.jpg",
        area: "96亩",
        price: "900元/亩/年",
        address: "清远市清新区"
      },
      {
        title: "超优质连片水田出租",
        url: "#some",
        icon: "/static/images/282x210.jpg",
        area: "96亩",
        price: "900元/亩/年",
        address: "清远市清新区"
      },
      {
        title: "清新区石潭镇185亩超优质连片水田出租清新区石潭镇185亩超优质连片水田出租",
        url: "#some",
        icon: "/static/images/282x210.jpg",
        area: "96亩",
        price: "900元/亩/年",
        address: "清远市清新区"
      }
    ];

    $scope.descSlider = descSlider;

    $timeout(function () {
      slider.init(descSlider.sliderId, descSlider.imgs, descSlider, 1, false,"leftRight");
    }, 0);

    $scope.nextClick = function () {
      descSlider.current!==descSlider.lastIndex&&slider.next();
    };
    $scope.prevClick = function () {
      descSlider.current!==0&&slider.prev();
    };
    $scope.descItemClick = function (index) {
      slider.moveTo(index);
    }


  }]);

});