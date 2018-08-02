define(['app','css!/src/css/main'], function (app) {
  'use strict';
  app.ctrl('mainCtrl', ["$scope",function ($scope,$state) {
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
    $scope.supplierType=0;
    /*
    <div class="module-img">
          <img src="/static/images/282x210.jpg" />
          <p class="module-flags fs-12 se-contrast"><span>出租仓库用地</span><span>出租</span></p>
      </div>
      <div class="module-info">
          <p class="module-title fs-18 se-main ell-2">清新区石潭镇185亩超优质连片水田出租</p>
          <p class="fs-18 se-deeper tr"><span class="fs-12 se-thinner fl mt-3">96亩</span>900元/亩/年</p>
          <p class="fs-16 address-icon se-shallow">清远市清新区</p>
      </div>
     */
    $scope.landRentList=[
      {
        title:"清新区石潭镇185亩超优质连片水田出租",
        url:"#some",
        icon:"/static/images/282x210.jpg",
        flags:["出租仓库用地","出租"],
        area:"96亩",
        price:"900元/亩/年",
        address:"清远市清新区"
      },
      {
        title:"清新区石潭镇185亩超优质连片水田出租",
        url:"#some",
        icon:"/static/images/282x210.jpg",
        area:"96亩",
        price:"900元/亩/年",
        address:"清远市清新区"
      },
      {
        title:"超优质连片水田出租",
        url:"#some",
        icon:"/static/images/282x210.jpg",
        area:"96亩",
        price:"900元/亩/年",
        address:"清远市清新区"
      },
      {
        title:"清新区石潭镇185亩超优质连片水田出租清新区石潭镇185亩超优质连片水田出租",
        url:"#some",
        icon:"/static/images/282x210.jpg",
        area:"96亩",
        price:"900元/亩/年",
        address:"清远市清新区"
      }
    ];
    $scope.landLookList=[
      {
        title:"按需找地",
        url:"#some",
        icon:"/static/images/282x210.jpg",
        info:"青龙养鸡场项目"
      },
      {
        title:"按需找地",
        url:"#some",
        icon:"/static/images/282x210.jpg",
        info:"青龙养鸡场项目"
      },{
        title:"按需找地",
        url:"#some",
        icon:"/static/images/282x210.jpg",
        info:"青龙养鸡场项目"
      },{
        title:"按需找地",
        url:"#some",
        icon:"/static/images/282x210.jpg",
        info:"青龙养鸡场项目"
      }
    ];

  }]);

});