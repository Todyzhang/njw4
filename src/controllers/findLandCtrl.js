define(['app','css!/src/css/findland'], function (app) {
  'use strict';
  app.ctrl('findLandCtrl', ["$scope",function ($scope,$state) {
    // console.log(require.pathFromUrl('../css/main.css'))
    //$state.transitionTo("main.index")
    $scope.sliderList=[
      {img:"static/images/banner0.jpg",url:"#some"},
      {img:"static/images/banner1.jpg",url:"#some"},
      {img:"static/images/banner2.jpg",url:"#some"}
    ]
    $scope.typeList = [
      {"type": 0, "typeName": "合作社"},
      {"type": 1, "typeName": "经纪人/代办"},
      {"type": 2, "typeName": "家庭农场"},
      {"type": 3, "typeName": "批发商/代卖"},
      {"type": 4, "typeName": "种植户"},
      {"type": 5, "typeName": "养殖户"},
      {"type": 6, "typeName": "种植企业"},
      {"type": 7, "typeName": "养殖企业"},
      {"type": 8, "typeName": "苗木花卉"},
      {"type": 9, "typeName": "出口企业商"},
      {"type": 10, "typeName": "超市"},
      {"type": 11, "typeName": "食堂"},
      {"type": 12, "typeName": "酒店"},
      {"type": 13, "typeName": "餐饮店"},
      {"type": 14, "typeName": "农产品加工"},
      {"type": 15, "typeName": "物流/仓储"},
      {"type": 16, "typeName": "仓储/冷库"},
      {"type": 17, "typeName": "其他"}
    ];


  }]);

});