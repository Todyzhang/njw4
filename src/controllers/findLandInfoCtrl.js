define(['app','angular', 'css!/src/css/findland'], function (app,angular) {
  'use strict';
  app.ctrl('findLandInfoCtrl', ["$scope", "$timeout", "Slider", "$state", "njwAlert", "soil", "publicVal","parseLandInfo",
    function ($scope, $timeout, slider, $state, njwAlert, soil, publicVal,parseLandInfo) {

      $scope.dialogMsg = {
        txt: '',
        show: false
      };
      var getManagementTypes=function (ids) {
        var names="",ary=ids.split(",");
        angular.forEach(ary,function (v) {
          if(v>1)
            names+=publicVal.managementTypesId[v-1].name+","
        });
        return names.replace(/,$/,"");
      };
      var getFacility=function (ids) {
        var icons=[],
          ary=ids.split(","),
          kls=[
            {},
            {icon:"well",name:"水井"},
            {icon:"greenhouse",name:"大棚"},
            {icon:"warehouse",name:"仓库"},
            {icon:"house",name:"农机房"},
            {icon:"sunburn",name:"晾晒场"},
            {icon:"grow-seedlings",name:"育种育苗场"},
            {icon:"living-room",name:"生活生产用房"},
          ];
        angular.forEach(ary,function (v) {
          icons.push(kls[v]);
        });
        return icons;
      };
      var getServeAssort=function (ids) {
        var names="",ary=ids.split(",");
        angular.forEach(ary,function (v) {
          if(v>1)
            names+=publicVal.serveAssort[v-1].name+","
        });
        return names.replace(/,$/,"");
      };
      var getLand=function (areaId) {
        soil.findSoil({areaId3:areaId}, 1, 4)
          .then(function (res) {
            $scope.landRentList = parseLandInfo(res.list);

          }, function (err) {
            njwAlert.wrong("ajax请求数据列表出错，请重试！");
          });
      };
      var createSlider=function (imgs) {
        var list=[];
        angular.forEach(imgs,function (v) {
          if(v) {
            v=publicVal.imgHost+v;
            list.push({
              bImg: v,
              sImg: v
            });
          }
        });
        if(list.length===0){
          list.push({
            bImg: "/static/images/570x386.jpg",
            sImg: "/static/images/90x62.jpg"
          });
        }
        $scope.sliderList=list;
      };

      soil.findSoidByNumber($state.params.id)
        .then(function (res) {
          var landMsg = res;
          getLand(res.areaId);
          createSlider([res.img1,res.img2,res.img3,res.img4,res.img5]);
          landMsg.seeNumber = Math.ceil(Math.random() * 1000);
          landMsg.dealMode = publicVal.dealModeId[res.dealModeId - 1].name;
          landMsg.publicTime = res.publicTime || +new Date;
          landMsg.dealUnit = publicVal.dealUnitId[res.dealUnitId - 1].name;
          landMsg.dealPrice = res.dealPrice ? (res.dealPrice + landMsg.dealUnit) : "面议";
          landMsg.smoothDegree=res.smoothDegreeId?publicVal.smoothDegreeId[res.smoothDegreeId-1].name:"未知";
          landMsg.powerSupply=res.powerSupplyId?publicVal.powerSupplyId[res.powerSupplyId-1].name:"未知";
          landMsg.network=res.networkId?publicVal.networkId[res.networkId-1].name:"未知";
          landMsg.ifAccess=res.ifAccessId?publicVal.ifAccessId[res.ifAccessId-1].name:"未知";
          landMsg.headWater=res.headWaters?publicVal.headWaters[res.headWaters-1].name:"未知";
          landMsg.waterName=res.water?publicVal.water[res.water-1].name:"未知";
          landMsg.managementTypes=res.managementTypesId?getManagementTypes(res.managementTypesId):"未知";
          landMsg.ownership=res.ownershipType?publicVal.ownershipType[res.ownershipType-1].name:"未知";
          landMsg.serveAssortName=res.serveAssort?getServeAssort(res.serveAssort):"未知";
          landMsg.facilityIcons=res.facility?getFacility(res.facility):[];
          $scope.landMsg = landMsg;

        }, function (err) {
          njwAlert.wrong("ajax请求详情数据出错，请重试！");
        });


      $scope.landRentList = [
        {
          title: "清新区石潭镇185亩超优质连片水田出租",
          url: "#some",
          icon: "/static/images/282x210.jpg",
          flags: ["出租仓库用地", "出租"],
          area: "96亩",
          price: "900元/亩/年",
          address: "清远市清新区"
        }
      ];

      $scope.sliderList = [
        {
          bImg: "/static/images/570x386.jpg",
          sImg: "/static/images/90x62.jpg"
        }
      ];


      $scope.showDialog = function (txt) {
        $scope.dialogMsg = {
          txt: txt,
          show: true
        };
      };
      $scope.closeDialog = function () {
        $scope.dialogMsg.show = false;
      };


    }]);

});