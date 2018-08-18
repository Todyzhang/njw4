define(['app', 'css!/src/css/findland'], function (app) {
  'use strict';
  app.ctrl('findLandInfoCtrl', ["$scope", "$timeout", "Slider","$state", function ($scope, $timeout, slider,$state) {

    $scope.dialogMsg = {
      txt: '',
      show: false
    };

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

    $scope.sliderList=[
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
    ];



    $scope.showDialog = function (txt) {
      $scope.dialogMsg={
        txt : txt,
        show : true
      };
    };
    $scope.closeDialog = function () {
      $scope.dialogMsg.show = false;
    };


  }]);

});