define(['app', 'css!/src/css/end'], function (app) {
  'use strict';
  app.ctrl('landAddCtrl', ["$scope", "queryClassify", "$q","soil", "publicVal",function ($scope, queryClassify, $q,soil,publicVal) {

    /*
    SoilAddVo {
    acreage (integer, optional): 土地面积 ,
    acreageUnit (string, optional): 土地面积单位 ,
    areaId (integer, optional): 所在区域 ,
    contact (string, optional): 土地联系人 ,
    contactMode (string, optional): 土地联系人联系方式 ,
    dealAge (integer, optional): 可流转年限 ,
    dealModeId (integer, optional): 可流转方式 ,
    dealPrice (integer, optional): 可流转价格 0或不填为“面议” ,
    dealUnitId (integer, optional): 流转价格单位 1,元/亩/年 2,元/平米/月 3,万元/年 4,万元 ,
    facility (string, optional): 地上设施 1,水井 2大棚 3、仓库 4、农机房 5、晾晒场 6、育种育苗场 7、生活生产用房'多选框 条件用逗号隔开 ,
    headWaters (integer, optional): 供水条件 1,已通水 2,未通水可通水 3,未通水 ,
    highway (string, optional): 交通要道 ,
    ifAccessId (integer, optional): 是否通路 1,'已通路' 2,'未通路' ,
    img1 (string, optional): 图片1 ,
    img2 (string, optional): 图片2 ,
    img3 (string, optional): 图片3 ,
    img4 (string, optional): 图片4 ,
    img5 (string, optional): 图片5 ,
    img6 (string, optional): 图片6 ,
    industryResource (string, optional): 产业资源 ,
    managementTypesId (string, optional): 适合经营 多选框 条件用逗号隔开 ,
    nature (string, optional): 土地性质 ,
    networkId (integer, optional): 网络条件 1,'已通网络' 2,'未通网络' 3,'未通可通网络' ,
    number (string, optional): 地块编号 ,
    ownershipType (integer, optional): 权属类型 1,'个人' 2,'集体' 3,'国有' ,
    powerSupplyId (integer, optional): 供电条件 1,已通电 2,未通电 3,未通可通电 ,
    promulgator (string, optional): 发布者 11位手机号 ,
    publicTime (string, optional): 发布日期 ,
    scenicSpots (string, optional): 旅游景点 ,
    serveAssort (string, optional): 服务配套 1,物流 2、仓储 3、批发市场 4、超市 5、农科站',多选框 条件用逗号隔开 ,
    smoothDegreeId (integer, optional): 平整程度 1,非常平整 2,程度一般 3,程度较差 ,
    submitTime (string, optional): 提交日期 ,
    title (string, optional): 发布标题 ,
    typeId (integer, optional): 土地类型 ,
    warrantType (string, optional): 政权类型 ,
    water (integer, optional): 水源条件 1,'水源充足' 2,'水源稀缺'
    }

    1	土地标题	为空	请输入土地标题！
    2	土地标题	格式错误	请输入20个字符以内有效土地标题！
    3	土地类型	未选择	请选择土地类型！
    4	土地类型	二级未选	请选择土地类型二级类目！
    5	所在区域	未选择	请选择所在区域！
    6	所在区域	部分未选	请完整选择所在区域！
    7	流转方式	未选择	请选择流转方式！
    8	土地联系人	为空	请输入土地联系人！
    9	土地联系人	格式错误	请输入10个字符以内有效联系人！
    10	联系方式	为空	请输入联系方式！
    11	联系方式	格式有误	请输入正确的联系方式！
     */

    $scope.soilAddVo={};


    $scope.inputFiled_1 = {
      placeholder: '土地标题信息，20个字符以内',
      title: '土地标题',
      tipsText: '例：清远市清新区100亩优质水田出租',
      required: '土地标题不能为空',
      check: {
        maxlength:{value:20,errMsg:'土地标题不能多于20个字符'}
      },
      large: true
    };
    $scope.inputFiled_2 = {
      placeholder: '请输入',
      title: '可流转年限',
      //errorMsg:'土地标题不能为空',
      unit:'年',
      check: {
        // required:{value:true,errMsg:'土地标题不能为空'},
        // maxlength:{value:3,errMsg:'土地标题不能多于20个字符'}
      }
    };
    $scope.inputFiled_3 = {
      placeholder: '请输入联系人',
      title: '土地联系人',
      required: '联系人不能为空',
      check: {
        // required:{value:true,errMsg:'土地标题不能为空'},
        // maxlength:{value:3,errMsg:'土地标题不能多于20个字符'}
      },
      large: true
    };
    $scope.inputFiled_4 = {
      placeholder: '请输入联系方式',
      title: '联系方式',
      required: '联系方式不能为空',
      check: {
        // required:{value:true,errMsg:'土地标题不能为空'},
        // maxlength:{value:3,errMsg:'土地标题不能多于20个字符'}
      },
      large: true
    };

    $scope.inputFiled_5 = {
      placeholder: '如：一般耕地、农保地、林保地、建设用地等',
      title: '土地性质',
      check: {
        // required:{value:true,errMsg:'土地标题不能为空'},
        // maxlength:{value:3,errMsg:'土地标题不能多于20个字符'}
      },
      large: true
    };
    $scope.inputFiled_6 = {
      placeholder: '如：农村土地承包经营权证',
      title: '权证类型',
      large: true
    };
    $scope.inputFiled_7 = {
      placeholder: '如：G25高速、G205国道、114省道等',
      title: '交通要道',
      large: true
    };
    $scope.inputFiled_8 = {
      placeholder: '如：旅游景点区',
      title: '产业资源',
      large: true
    };
    $scope.inputFiled_9 = {
      placeholder: '如：西岸古村',
      title: '旅游景点',
      large: true
    };

    $scope.inputFiled_10={
      value: "面议",
      title: '流转价格',
      idDisabled:true,
      show:false
    };

    $scope.selector_2 =
      {
        title: '土地类型',
        required: true,
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.landType,
            placeholder: '一级大类',
            value: null,
            optionChange: function (name,id) {
              if(!name||!id) return ;

              queryClassify.getLand(id)
                .then(function (value) {
                  $scope.selector_2.selectors[1].list = value;
                  $scope.selector_2.selectors[1].value = value[0].id;
                })
            }
          },
          {
            list: [],
            placeholder: '二级大类',
            value: null
          }
        ]
      };

    $scope.selector_3 =
      {
        title: '所在区域',
        required: true,
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.provinceArea,
            placeholder: '省份',
            value: null,
            optionChange: function (name,id) {
              if(!name||!id) return ;

              queryClassify.getArea(id)
                .then(function (value) {
                  $scope.selector_3.selectors[1].list = value;
                  $scope.selector_3.selectors[1].value = value[0].id;
                })
            }
          },
          {
            list: [],
            placeholder: '城市',
            value: null,
            optionChange: function (name,id) {
              if(!name||!id) return ;

              queryClassify.getArea(id)
                .then(function (value) {
                  $scope.selector_3.selectors[2].list = value;
                  $scope.selector_3.selectors[2].value = value[0].id;
                })
            }
          },
          {
            list: [],
            placeholder: '县/区',
            value: null
          }
        ]
      };

    //土地面积
    $scope.inputSelector_1={
      title: '土地面积',
      required: '请输入土地面积',
      check:{},
      optionName: "name",
      optionValue: "id",
      list: publicVal.acreageUnit,
      initSelectorValue:'亩',//选择框初始值
      placeholder: '请输入',
      value: null
    };

    $scope.inputSelector_2={
      title: '流转价格',
      optionName: "name",
      optionValue: "id",
      list: publicVal.dealUnitId,
      initSelectorValue:1,
      selectorFilter:"1",
      placeholder: '请输入',
      value: null,
      width:'224px',
      tipsText:'0 或 不填则为面议'
    };

    $scope.selector_4 =
      {
        title: '流转方式',
        required: true,
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list:publicVal.dealModeId,
            placeholder: '请选择',
            value: null
          }
        ]
      };


    $scope.imgs=[];

    $scope.selector_5 =
      {
        title: '平整程度',
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.smoothDegreeId,
            placeholder: '请选择',
            value: null
          }
        ]
      };

    $scope.selector_6 =
      {
        title: '供电条件',
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.powerSupplyId,
            placeholder: '请选择',
            value: null
          }
        ]
      };

    $scope.selector_7 =
      {
        title: '供水条件',
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.headWaters,
            placeholder: '请选择',
            value: null
          }
        ]
      };
    $scope.selector_8 =
      {
        title: '网络条件',
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.networkId,
            placeholder: '请选择',
            value: null
          }
        ]
      };
    $scope.selector_9 =
      {
        title: '是否通路',
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.ifAccessId,
            placeholder: '请选择',
            value: null
          }
        ]
      };

    $scope.selector_10 =
      {
        title: '水源条件',
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.water,
            placeholder: '请选择',
            value: null
          }
        ]
      };
    $scope.selector_11 =
      {
        title: '权属类型',
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: publicVal.ownershipType,
            placeholder: '请选择',
            value: null
          }
        ]
      };



    //适合经营
    $scope.selector_multi=publicVal.managementTypesId;

    $scope.checkbox1=publicVal.facility;
    $scope.checkbox2=publicVal.serveAssort;

    $scope.submitBtn=function(){
      soil.addSoil($scope.soilAddVo)
        .then(function (value) {
          alert("成功")
        })
    }

    $scope.changeSelect=function () {
      var id=$scope.selector_4.selectors[0].value;
      if(!id) return;
      id=+id;//变整数
      //当选择的流转方式为“转让”时，默认流转价格单位为“万元”
      if(id===1){
        $scope.inputSelector_2.initSelectorValue="万元";
        $scope.inputSelector_2.selectorFilter="1";
        $scope.inputSelector_1.initSelectorValue="亩";
        $scope.inputFiled_10.show=false;
      }
      //流转方式为“出租”情况下
      else if(id===2){
        //当土地一级类型为“商业住宅用地”或二级类型为“工矿仓储用地”中的“厂房”及“仓储用地”时
        if(
          $scope.selector_2.selectors[0].value===17
          ||$scope.selector_2.selectors[1].value===22
          ||$scope.selector_2.selectors[1].value===25
        ){
          //默认土地面积单位为“平米”；默认流转价格单位为“万元/年”，可选单位包括“万元/年”、“元/平米/月”
          $scope.inputSelector_1.initSelectorValue="平米";
          $scope.inputSelector_2.initSelectorValue="万元/年";
          $scope.inputSelector_2.selectorFilter="2";
          $scope.inputFiled_10.show=false;
        }else{
          //默认土地面积单位为“亩”，默认流转价格单位为“元/亩/年”，可选单位包括“元/亩/年”、“万元/年”
          $scope.inputSelector_1.initSelectorValue="亩";
          $scope.inputSelector_2.initSelectorValue="元/亩/年";
          $scope.inputSelector_2.selectorFilter="3";
          $scope.inputFiled_10.show=false;
        }
      }
      //当选择的流转方式为“转包”、“入股”、“互换”或“其他”时，“流转价格”变换样式为“面议”不可编辑
      else if(id>=3){
        $scope.inputSelector_2.selectorFilter="1";
        $scope.inputSelector_1.initSelectorValue="亩";
        $scope.inputSelector_2.initSelectorValue="元/亩/年";
        $scope.inputFiled_10.show=true;
      }
    };

    $scope.$watch("selector_4.selectors[0].value",function (n,o) {
      $scope.changeSelect();
    });
    $scope.$watch("$scope.selector_2.selectors[0].value",function (n,o) {
      $scope.changeSelect();
    });
    $scope.$watch("$scope.selector_2.selectors[1].value",function (n,o) {
      $scope.changeSelect();
    });


    $scope.submitFn=function () {
      if($scope.addLand.$invalid){
        alert("表单还有未完成")
      }
    };

    $scope.$parent.alternation["addLand"]=function () {
      $scope.submitFn();
    }

    $scope.$watch('addLand.$invalid',function (n) {
      $scope.$parent.addLandFormOk=n;
    })


  }]);

});