define(['app','css!/src/css/agroService'], function (app) {
  'use strict';
  app.ctrl('agroServiceCtrl', ["$scope",function ($scope,$state) {
    $scope.sliderList = [
      {img: "static/images/banner0.jpg", url: "#some"},
      {img: "static/images/banner1.jpg", url: "#some"},
      {img: "static/images/banner2.jpg", url: "#some"}
    ]
    $scope.partners=[
      {img:"/static/images/partner.png",url:"#some"},
      {img:"/static/images/partner.png",url:"#some"},
      {img:"/static/images/partner.png",url:"#some"},
      {img:"/static/images/partner.png",url:"#some"},
      {img:"/static/images/partner.png",url:"#some"},
      {img:"/static/images/partner.png",url:"#some"},
      {img:"/static/images/partner.png",url:"#some"},
      {img:"/static/images/partner.png",url:"#some"}
    ]



  }]);

});