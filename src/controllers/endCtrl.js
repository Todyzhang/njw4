define(['app', 'css!/src/css/end'], function (app) {
  'use strict';
  app.ctrl('endCtrl', ["$scope", "queryClassify", "$q", function ($scope, queryClassify, $q) {

    $scope.inputFiled_1 = {
      placeholder: '土地标题信息，20个字符以内',
      title: '土地标题',
      //errorMsg:'土地标题不能为空',
      tipsText: '例：清远市清新区100亩优质水田出租',
      required: '土地标题不能为空',
      // unit:'亩',
      check: {
        // required:{value:true,errMsg:'土地标题不能为空'},
        // maxlength:{value:3,errMsg:'土地标题不能多于20个字符'}
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
        {id:'1',name:'亩'},
        {id:'2',name:'平米'}
      ],
      placeholder: '请输入',
      value: null
    };

    $scope.inputSelector_2={
      title: '流转价格',
      required: true,
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

    $scope.imgs=[
      {compressImagePath:'/static/images/282x190.jpg',id:"1"},
      {compressImagePath:'/static/images/282x190.jpg',id:"2"},
      {compressImagePath:'/static/images/282x190.jpg',id:"3"},
      // {compressImagePath:'/static/images/282x190.jpg',id:"4"},
      // {compressImagePath:'/static/images/282x190.jpg',id:"5"},
      {compressImagePath:'/static/images/282x190.jpg',id:"6"}
    ]

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


  }]);

});