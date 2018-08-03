define(['app','css!/src/css/findland'], function (app) {
  'use strict';
  app.ctrl('findLandCtrl', ["$scope",function ($scope,$state) {
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

    $scope.snNewsImg=[
      {
        img: "/static/images/282x190.jpg",
        title: "一站式找地服务",
        url: "#some"
      },
      {
        img: "/static/images/282x190.jpg",
        title: "流转交易咨询服务",
        url: "#some"
      },
      {
        img: "/static/images/282x190.jpg",
        title: "金融服务",
        url: "#some"
      }
    ];
    $scope.gjzcNews={
      list: [
        {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
        {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
        {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
        {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"}
      ],
      img:{
        img: "/static/images/282x190.jpg",
        title: "开展2017年度金融支农服务创新试点开展2017年度金融",
        from: "农业部",
        url: "#some"
      },
      caption:{
        title:"国家政策",
        url:"#some"
      }
    }


  }]);

});