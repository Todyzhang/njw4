define(['app', 'angular', 'css!/src/css/findland'], function (app, angular) {
  'use strict';
  app.ctrl('findLandCtrl', ["$scope", "publicVal", "$timeout", "queryClassify","getNews",
    function ($scope, publicVal, $timeout, queryClassify,getNews) {
      var soidfindVo = {
        areaId0: 0,//省
        areaId1: 0,//市

        statuId: 0,//分类

        managementTypesId1: 0, //标签一级
        managementTypesId2: 0, //标签二级

        dealModeId: 0,//流转方式

        acreageMax: 0,//最大土地面积
        acreageMin: 0,//最小土地面积

        dealAgeMax: 0,//最大可流转年限
        dealAgeMin: 0,//最小可流转年限

        by: 1, //序列 1,倒序(默认) 2,顺序 ,
        order: 1 //排序模式 1,时间(默认) 2,面积 3,年限
      };
      var getSelectItemList = function () {
        $scope.selectItems = [
          {
            "title": "区域",
            "list": (function () {
              var ary = [];
              ary.push({id: 0, name: "全国"});
              angular.forEach(publicVal.provinceArea, function (v) {
                ary.push({id: v.id, name: v.name});
              });
              return ary;
            })(),
            "children": [],
            "active": {"list": 0, "children": 0},
            "itemClick": function (data) {
              if (data.id === 0) {
                $scope.selectItems[0].children = [];
                $scope.selectItems[0].active.children = 0;
              } else {
                queryClassify.getArea(data.id)
                  .then(function (res) {
                    var list = [{id: data.id, name: "全省"}];
                    angular.forEach(res, function (_d) {
                      list.push({id: _d.id, name: _d.name});
                    });
                    $scope.selectItems[0].active.children = 0;
                    $scope.selectItems[0].children = list;
                  }, function (err) {
                    console.log(err)
                  });
              }
            }
          },
          {
            "title": "分类",
            "list": (function () {
              var ary = [];
              ary.push({id: 0, name: "不限"});
              angular.forEach(publicVal.landType, function (v) {
                ary.push({id: v.id, name: v.name});
              });
              return ary;
            })(),
            "active": {"list": 0, "children": 0},
            "itemClick": function (data) {

            }
          },
          {
            "title": "标签",
            "list": (function () {
              var ary = [];
              ary.push({id: 0, name: "不限"});
              angular.forEach(publicVal.managementTypesId, function (v) {
                ary.push({id: v.id, name: v.name});
              });
              return ary;
            })(),
            "children": [],
            "active": {"list": 0, "children": 0},
            "itemClick": function (data) {
              if (data.id === 0) {
                $scope.selectItems[2].children = [];
                $scope.selectItems[2].active.children = 0;
              } else {
                queryClassify.getStair(data.id)
                  .then(function (res) {
                    var list = [{id: data.id, name: "不限"}];
                    angular.forEach(res, function (_d) {
                      list.push({id: _d.id, name: _d.name});
                    });
                    $scope.selectItems[2].active.children = 0;
                    $scope.selectItems[2].children = list;
                  }, function (err) {
                    console.log(err)
                  });
              }
            }
          },
          {
            "title": "面积",
            "list": [
              {id: 0, name: "不限", acreageMax: 0, acreageMin: 0},
              {id: 1, name: "10亩以下", acreageMax: 10, acreageMin: 0},
              {id: 2, name: "10~100亩", acreageMax: 100, acreageMin: 10},
              {id: 3, name: "100~1000亩", acreageMax: 1000, acreageMin: 100},
              {id: 4, name: "1000~5000亩", acreageMax: 5000, acreageMin: 1000},
              {id: 5, name: "5000亩以上", acreageMax: 0, acreageMin: 5000}
            ],
            "active": {"list": 0, "children": 0},
            "itemClick": function (data) {

            }
          },
          {
            "title": "年限",
            "list": [
              {id: 0, name: "不限", dealAgeMax: 0, dealAgeMin: 0},
              {id: 1, name: "5年以下", dealAgeMax: 5, dealAgeMin: 0},
              {id: 2, name: "5~10年", dealAgeMax: 10, dealAgeMin: 5},
              {id: 3, name: "10~20年", dealAgeMax: 20, dealAgeMin: 10},
              {id: 4, name: "20~30年", dealAgeMax: 30, dealAgeMin: 20},
              {id: 5, name: "30~40年", dealAgeMax: 40, dealAgeMin: 30},
              {id: 5, name: "40年以上", dealAgeMax: 0, dealAgeMin: 40}
            ],
            "active": {"list": 0, "children": 0},
            "parentClick": function (data) {

            },
            "subClick": function (data) {

            }
          }
        ];
      };

      $scope.selectItems = [
        {
            img: "/static/images/282x190.jpg",
            title: "一站式找地服务",
            url: "#some"
          }
      ];

      //留出ajax时间
      $timeout(function () {
        getSelectItemList();
      }, 100);

      //选项点击事件
      $scope.selectItemClick = function (pos, i, _parent, _sub) {
        if (pos === 1) {
          _parent.active.list = i;
          _parent.itemClick(_sub)
        } else {
          _parent.active.children = i;
        }
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

      //涉农服务
      $scope.snNewsImg = [
        {
          img: "/static/images/282x190.jpg",
          title: "一站式找地服务",
          url: "#some"
        }
      ];

      //国家政策
      $scope.gjzcNews = {
        list: [
          {title: "开展2017年度金融支农服务创新试点开展2017年度金融", from: "农业部", date: "2018/04/05", url: "#some"}
        ],
        img: {
          img: "/static/images/282x190.jpg",
          title: "开展2017年度金融支农服务创新试点开展2017年度金融",
          from: "农业部",
          url: "#some"
        },
        caption: {
          title: "国家政策",
          url: "http://www.nongj.com/info/infoList?id=81"
        }
      }

      getNews.findLandPage()
        .then(function (res) {
          var imgs=[],img1=res.jyfw[0],img2=res.nyds[0],img3=res.nznq[0];
          //{"typeName":"金融服务,农业电商,农资农机,政务动态,行政通知","pageSize":6,"attribute":1,"typeCode":"jyfw,nyds,nznq,zwdt,xztz"}
          imgs[0]={
            img: "http://static.nongj.com/"+img1.recommendImgUrl,
            title: img1.infoTitle,
            url: 'http://www.nongj.com/info/infoContent?id='+img1.infoId
          };
          imgs[1]={
            img: "http://static.nongj.com/"+img2.recommendImgUrl,
            title: img2.infoTitle,
            url: 'http://www.nongj.com/info/infoContent?id='+img2.infoId
          };
          imgs[2]={
            img: "http://static.nongj.com/"+img3.recommendImgUrl,
            title: img3.infoTitle,
            url: 'http://www.nongj.com/info/infoContent?id='+img3.infoId
          };
          //涉农服务
          $scope.snNewsImg =imgs;

          //国家政策
          $scope.gjzcNews = {
            list: (function () {
              var list=[];
              angular.forEach(res.zwdt, function (_d,i) {
                if(i>0&&i<3){
                  list.push({title: _d.infoTitle, date: _d.createDate,url:'http://www.nongj.com/info/infoContent?id='+_d.infoId});
                }

              });
              angular.forEach(res.xztz, function (_d,i) {
                if(i<3){
                  list.push({title: _d.infoTitle, date: _d.createDate,url:'http://www.nongj.com/info/infoContent?id='+_d.infoId});
                }

              });
              return list;
            })(),
            img:(function () {
              var li=res.zwdt[0],img;
              img={
                img: "http://static.nongj.com/"+li.recommendImgUrl,
                title: li.infoTitle,
                url: 'http://www.nongj.com/info/infoContent?id='+li.infoId
              };

              return img;
            })(),
            caption: {
              title: "国家政策",
              url: "http://www.nongj.com/info/infoList?id=81"
            }
          }

        });




    }]);

});