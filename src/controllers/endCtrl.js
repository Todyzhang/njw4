define(['app', 'css!/src/css/end'], function (app) {
  'use strict';
  app.ctrl('endCtrl', ["$scope", "queryClassify", "$q", function ($scope, queryClassify, $q) {
    $scope.title = 'mainIndexCtrl';
    $scope.inputFiled = {
      name: 'title',
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
            getSelect2List: function (name,id) {
              if(!name||!id) return ;

              queryClassify.getArea(id)
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

    queryClassify.getArea()
      .then(function(result){
        selector_2.selectors[0].list=result;
      })
    //
    // queryClassify.getStair()

  }]);

});