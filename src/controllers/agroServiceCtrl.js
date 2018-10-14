define(['app','css!/src/css/agroService'], function (app) {
  'use strict';
  app.ctrl('agroServiceCtrl', ["$scope",function ($scope) {
    $scope.sliderList = [
      {img: "static/images/banner0.jpg", url: "#some"},
      {img: "static/images/banner1.jpg", url: "#some"},
      {img: "static/images/banner2.jpg", url: "#some"}
    ]
    $scope.partners=[
      {img:"/static/images/parner_2_3.png"},
      {img:"/static/images/parner_3_1.png"},
      {img:"/static/images/parner_3_2.png"},
      {img:"/static/images/parner_3_3.png"},
      {img:"/static/images/parner_3_4.png"},
      {img:"/static/images/parner_4_1.png"},
      {img:"/static/images/parner_4_2.png"},
      {img:"/static/images/parner_4_3.png"}
    ]



  }]);

});