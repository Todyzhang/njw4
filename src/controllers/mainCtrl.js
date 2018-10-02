define(['app', 'css!/src/css/main'], function (app) {
  'use strict';
  app.ctrl('mainCtrl', ["$scope","$rootScope","publicVal","queryClassify","$timeout","soilDemand","njwAlert",
    function ($scope,$rootScope,publicVal,queryClassify,$timeout,soilDemand,njwAlert) {
    // console.log(require.pathFromUrl('../css/main.css'))
    //$state.transitionTo("main.index")

    //====提交需求form=====
    var selectAddr,selectLandType,getCityList,getTypeList,
      isInSubmit=false;
    /*
      SoilDemandVo {
      acreage (integer, optional): 土地面积(单位亩) ,
      areaId (integer, optional): 城市区域id ,
      describe (string, optional): 描述(不能为空,140个字符内.) ,
      managementTypesId (integer, optional): 土地经营类型 ,
      phone (string, optional): 手机号
      }
   */
    $scope.needLandForm={
      acreage:"",
      areaId:"",
      describe:"",
      managementTypesId:"",
      phone:""
    };

    $scope.landTypeName = "";
    $scope.addrsText="";

    selectAddr = {
      placeholder: "地区选择",
      show: false,
      level: 3,
      reBackTip: {"2": "其它省份","3":"其它城市"},
      data: [],
      itemClick: function (data, cb) {
        queryClassify.getArea(data.id)
          .then(function (res) {
            var list = [];
            angular.forEach(res, function (_d) {
              list.push({id: _d.id, name: _d.name});
            });
            data.children = list;
            typeof cb === "function" && cb(data);
          }, function (err) {
            console.log(err)
          });
      },
      setResult: function (data,names) {
        $scope.addrsText = names;
        $scope.needLandForm.areaId=data.id;
      }
    };

    getCityList=function() {
      var list = [];
      angular.forEach(publicVal.provinceArea, function (_d) {
        list.push({id: _d.id, name: _d.name});
      });
      selectAddr.data=list;
    };

    $scope.selectCity=function (e) {
      var target=e.target || e.srcElement;
      selectAddr.target = angular.element(target).parent();
      selectAddr.show = true;
      if(selectAddr.data.length===0){
        getCityList();
      }
      $rootScope.selectDialogData = selectAddr;
    };

    selectLandType = {
      placeholder: "类型选择",
      show: false,
      level: 2,
      reBackTip: {"2": "其它类型"},
      data: [],
      itemClick: function (data, cb) {
        queryClassify.getLand(data.id)
          .then(function (res) {
            var list = [];
            angular.forEach(res, function (_d) {
              list.push({id: _d.id, name: _d.name});
            });
            data.children = list;
            typeof cb === "function" && cb(data);
          }, function (err) {
            console.log(err)
          });
      },
      setResult: function (data,names) {
        $scope.landTypeName = names;
        $scope.needLandForm.managementTypesId=data.id;
      }
    };

    getTypeList=function() {
      var list = [];
      angular.forEach(publicVal.landType, function (_d) {
        list.push({id: _d.id, name: _d.name});
      });
      selectLandType.data=list;
    };

    $scope.selectType=function (e) {
      var target=e.target || e.srcElement;
      selectLandType.target = angular.element(target).parent();
      selectLandType.show = true;
      if(selectLandType.data.length===0){
        getTypeList();
      }
      $rootScope.selectDialogData = selectLandType;
    };

    $scope.addNeedLand=function () {
      if(!isInSubmit){
        isInSubmit=true;
        $scope.needLandForm.acreage=+$scope.needLandForm.acreage;
        soilDemand.addSoil($scope.needLandForm)
          .then(function () {
            njwAlert.right("提交成功，我们将安排专人和您对接！");
            isInSubmit=false;
          },function (err) {
            njwAlert.wrong("提交失败，请稍后重试！");
            isInSubmit=false;
          })
      }
    };




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
      },
      {
        title: "清新区石潭镇185亩超优质连片水田出租",
        url: "#/landInfo/2",
        icon: "/static/images/282x210.jpg",
        area: "96亩",
        price: "900元/亩/年",
        address: "清远市清新区"
      },
      {
        title: "超优质连片水田出租",
        url: "#/landInfo/3",
        icon: "/static/images/282x210.jpg",
        area: "96亩",
        price: "900元/亩/年",
        address: "清远市清新区"
      },
      {
        title: "清新区石潭镇185亩超优质连片水田出租清新区石潭镇185亩超优质连片水田出租",
        url: "#/landInfo/4",
        icon: "/static/images/282x210.jpg",
        area: "96亩",
        price: "900元/亩/年",
        address: "清远市清新区"
      }
    ];
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
    $scope.landNews = [
      {
        list: [
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"}
        ],
        img:{
          img: "/static/images/370x252.jpg",
          title: "开展2017年度金融支农服务创新试点开展2017年度金融",
          from: "农业部",
          url: "#some"
        },
        caption:{
          title:"土地流转",
          url:"/#/news"
        }

      },
      {
        list: [
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"},
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"}
        ],
        img:{
          img: "/static/images/370x252.jpg",
          title: "开展2017年度金融支农服务创新试点开展2017年度金融",
          from: "农业部",
          url: "#some"
        },
        caption:{
          title:"国家政策",
          url:"/#/news"
        }
      }
    ];



  }]);

});