define(['app', 'css!/src/css/end'], function (app) {
  'use strict';
  app.ctrl('endCtrl', ["$scope", "queryClassify", "$q","soil", function ($scope, queryClassify, $q,soil) {

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

    var selector_2 =
      {
        title: '土地类型',
        required: true,
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: [],
            placeholder: '一级大类',
            value: null,
            getNextSelectList: function (name,id) {
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
    $scope.selector_2 = selector_2;
    queryClassify.getLand()
      .then(function(result){
        selector_2.selectors[0].list=result;
      })
    var selector_3 =
      {
        title: '所在区域',
        required: true,
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: [],
            placeholder: '省份',
            value: null,
            getNextSelectList: function (name,id) {
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
            getNextSelectList: function (name,id) {
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
    $scope.selector_3 = selector_3;

    queryClassify.getArea()
      .then(function(result){
        selector_3.selectors[0].list=result;
      });

    $scope.selector_4 =
      {
        title: '流转方式',
        required: true,
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: [
              {id:'1',name:'转让'},
              {id:'2',name:'出租'},
              {id:'3',name:'转包'},
              {id:'4',name:'入股'},
              {id:'5',name:'互换'},
              {id:'6',name:'其他'}
            ],
            placeholder: '请选择',
            value: null
          }
        ]
      };
    //土地面积
    $scope.inputSelector_1={
      title: '土地面积',
      required: true,
      optionName: "name",
      optionValue: "id",
      list: [
        {id:'亩',name:'亩'},
        {id:'平米',name:'平米'}
      ],
      placeholder: '请输入',
      value: null
    };

    $scope.inputSelector_2={
      title: '流转价格',
      optionName: "name",
      optionValue: "id",
      list: [
        {id:'1',name:'元/亩/年'},
        {id:'2',name:'元/平米/月'},
        {id:'3',name:'万元/年'},
        {id:'3',name:'万元'}
      ],
      placeholder: '请输入',
      value: null,
      width:'224px',
      tipsText:'0 或 不填则为面议'
    };

    $scope.imgs=[];

    $scope.selector_5 =
      {
        title: '平整程度',
        optionName: "name",
        optionValue: "id",
        selectors: [
          {
            list: [
              {id:'1',name:'非常平整'},
              {id:'2',name:'程度一般'},
              {id:'3',name:'程度较差'}
            ],
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
            list: [
              {id:'1',name:'已通电'},
              {id:'2',name:'未通可通电'},
              {id:'3',name:'未通电'}
            ],
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
            list: [
              {id:'1',name:'已通水'},
              {id:'2',name:'未通可通水'},
              {id:'3',name:'未通水'}
            ],
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
            list: [
              {id:'1',name:'已通网络'},
              {id:'2',name:'未通可通网络'},
              {id:'3',name:'未通网络'}
            ],
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
            list: [
              {id:'1',name:'已通路'},
              {id:'2',name:'未通路'}
            ],
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
            list: [
              {id:'1',name:'水源充足'},
              {id:'2',name:'水源稀缺'}
            ],
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
            list: [
              {id:'1',name:'集体'},
              {id:'2',name:'个人'},
              {id:'3',name:'国有'}
            ],
            placeholder: '请选择',
            value: null
          }
        ]
      };

    queryClassify.getStair()
      .then(function (value) {
        $scope.selector_multi=value;
      });


    // $scope.selector_multi=[
    //   {name:'粮食油料类',value:'1'},
    //   {name:'水果坚果类',value:'2'},
    //   {name:'养殖类',value:'3'},
    //   {name:'蔬菜瓜果类',value:'4'},
    //   {name:'林木类',value:'5'},
    //   {name:'商业住宅类',value:'6'},
    //   {name:'工矿仓储类',value:'7'},
    //   {name:'其他',value:'8'}
    // ];

    $scope.checkbox1=[
      {id:1,name:"水井"},
      {id:2,name:"大棚"},
      {id:3,name:"仓库"},
      {id:4,name:"农机房"},
      {id:5,name:"晾晒场"},
      {id:6,name:"育种育苗场"},
      {id:7,name:"生活生产用房"}
    ]
    $scope.checkbox2=[
      {id:1,name:"物流"},
      {id:2,name:"仓储"},
      {id:3,name:"批发市场"},
      {id:4,name:"超市"},
      {id:5,name:"农科站"}
    ]

    $scope.submitBtn=function(){
      soil.addSoil($scope.soilAddVo)
        .then(function (value) {
          alert("成功")
        })
    }


  }]);

});