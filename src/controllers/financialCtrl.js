define(['app','css!/src/css/agroService'], function (app) {
  'use strict';
  app.ctrl('financialCtrl', ["$scope",function ($scope) {
    $scope.sliderList=[
      {img:"/static/images/financial.jpg",url:"#some"}
    ];
    $scope.partners=[
      {img:"/static/images/parner_4_1.png"},
      {img:"/static/images/parner_4_2.png"},
      {img:"/static/images/parner_4_3.png"},
      {img:"/static/images/partner.png"},
      {img:"/static/images/partner.png"},
      {img:"/static/images/partner.png"},
      {img:"/static/images/partner.png"},
      {img:"/static/images/partner.png"}
    ]



  }]);

});