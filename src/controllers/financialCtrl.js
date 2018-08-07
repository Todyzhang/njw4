define(['app','css!/src/css/agroService'], function (app) {
  'use strict';
  app.ctrl('financialCtrl', ["$scope",function ($scope,$state) {
    $scope.sliderList=[
      {img:"/static/images/financial.jpg",url:"#some"}
    ];
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