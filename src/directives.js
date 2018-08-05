define(['app', "angular"], function (app, angular) {
  'use strict';
  app
  /**
   * placeholder兼容IE8组件，支持readonly属性，并支持passward 类
   * 如placeholder的值是动态绑定的，需在元素上加入place-holder属性，属性值是动态绑定的变量名
   * e.g.
   * <input type="text" placeholder="输入想搜索的商品">
   * <input type="text" placeholder="{{inputTips}}" place-holder="inputTips">
   */
    .directive("placeholder", function () {
      return {
        restrict: "A",
        require: "?ngModel",
        link: function ($scope, iElm, iAttrs, ngModel) {
          var el = angular.element(iElm), tip, nodeName = el[0].nodeName, type;

          if ((nodeName !== "INPUT" && nodeName !== "TEXTAREA") || !ngModel) return;

          if (!('placeholder' in document.createElement('input'))) {
            tip = iAttrs.placeholder;

            $scope.$watch(iAttrs.placeHolder, function (n, o) {
              var v = ngModel.$modelValue;
              tip = iAttrs.placeholder;
              if (!v) {
                type === "password" ? el.after('<i>' + tip + '</i>') : el.val(tip);
                el.addClass("placeholder");
              } else {
                el.removeClass("placeholder")
              }
            }, true);


            if (!iAttrs.readonly) {
              el.on("focus", function () {
                if (type === "password") {
                  el.removeClass("placeholder").next().text("");
                } else if (el.val() === tip) {
                  el.removeClass("placeholder").val("");
                }
              });
              el.on("blur", function () {
                if (!el.val()) {
                  el.addClass("placeholder");
                  if (type === "password") {
                    el.next().text(tip);
                  } else {
                    el.val(tip);
                  }
                }
              });
            }

          }
        }
      };
    })
    /**
     * 限制input框输入，只能输入数字，属性值为限制的数字位数,负数限制不可输入；0表示不限制位数；正数为限制输入的位数
     * e.g. <input sn-number="7" />
     */
    .directive("snNumber", function () {
      return {
        restrict: "A",
        scope: {},
        require: "?ngModel",
        link: function ($scope, iElm, iAttrs, ngModel) {
          var size = +iAttrs.snNumber;
          var NUMBER_REG = /\D/g;
          if (!ngModel) return;
          ngModel.$viewChangeListeners.push(function () {
            var v = ngModel.$viewValue;
            var hasChange = false;
            if (!v) {
              return;
            }
            if (NUMBER_REG.test(v)) {
              v = v.replace(NUMBER_REG, "");
              /*
               用变量保存全局匹配正则表达式，多次匹配字符串时会出现对包含此规则的表达式判false,
               其原因为全局匹配的正则属性lastIndex所致，匹配完成一个字符串后，其lastIndex会赋值
               到字符串的最后一个字符位置，下次再匹配字符串时会以此lastIndex位置开始查找，故有时
               会对匹配的字符串判断false。解决方法是在匹配完一次后手动把正则表达式的lastIndex置0
               */
              NUMBER_REG.lastIndex = 0;
              hasChange = true;
            }
            if (size && v.length > size) {
              v = v.substr(0, size);
              hasChange = true;
            }
            if (hasChange) {
              ngModel.$setViewValue(v);
              ngModel.$render();
            }
          });
        }
      };
    })
    /**
     * 限制input框输入，只能输入小数。
     * 属性值为"0,0"表示不限制输入位数
     * 不输默认限制输入最多7位整数，2位小数
     * 负数限制不能输入
     * e.g. <input sn-float="7,2" />
     */
    .directive("snFloat", function () {
      return {
        restrict: "A",
        scope: {},
        require: "?ngModel",
        link: function ($scope, iElm, iAttrs, ngModel) {
          var _format = iAttrs.snFloat && iAttrs.snFloat.split(",");
          var intLength = 7,
            decimalsLength = 2,
            float_l = "",
            float_r = "",
            hasChange = false,
            firstDot;
          var FLOAT_REG = /[^0-9\.]|(^\.+)/g;
          if (!ngModel) return;
          if (angular.isArray(_format)) {
            intLength = +_format[0];
            decimalsLength = +_format[1];
          }
          ngModel.$viewChangeListeners.push(function () {
            var v = ngModel.$viewValue;
            hasChange = false;
            float_r = "";
            if (!v) {
              return;
            }
            if (FLOAT_REG.test(v)) {
              v = v.replace(FLOAT_REG, "");
              FLOAT_REG.lastIndex = 0;
              hasChange = true;
            }
            firstDot = v.indexOf(".");
            float_l = v;
            if (firstDot > -1) {
              float_l = v.substr(0, firstDot);
              float_r = v.substr(firstDot + 1);
            }
            if (intLength && float_l.length > intLength) {
              float_l = float_l.substr(0, intLength);
              hasChange = true;
            }
            if (decimalsLength && float_r) {
              if (float_r.indexOf(".") > -1) {
                float_r = float_r.replace(/\./g, "");
                hasChange = true;
              }
              if (float_r.length > decimalsLength) {
                float_r = float_r.substr(0, decimalsLength);
                hasChange = true;
              }
            }
            if (hasChange) {
              v = float_l + (firstDot > -1 ? "." : "") + float_r;
              ngModel.$setViewValue(v);
              ngModel.$render();
            }
          });
        }
      };
    })
    /**
     * 兼容IE限制input/textarea 框输入长度，属性值为限制的位数,负数限制不可输入；0表示不限制位数；正数为限制输入的位数
     * e.g. <input maxlength="7" />
     */
    .directive("maxlength", function () {
      return {
        restrict: "A",
        scope: {},
        require: "?ngModel",
        link: function ($scope, iElm, iAttrs, ngModel) {
          var size = +iAttrs.maxlength;
          if ('maxlength' in document.createElement('input') || !ngModel) return;
          ngModel.$viewChangeListeners.push(function () {
            var v = ngModel.$viewValue;
            var hasChange = false;
            if (!v) {
              return;
            }
            if (size && v.length > size) {
              v = v.substr(0, size);
              hasChange = true;
            }
            if (hasChange) {
              ngModel.$setViewValue(v);
              ngModel.$render();
            }
          });
        }
      };
    })
    .directive("menuItem", function () {
      return {
        restrict: "EA",
        /*
          scope值表示
          -false：儿子继承父亲的值，改变父亲的值，儿子的值也随着改变，反之亦然，这就是继承且不隔离
          -true：儿子继承父亲的值，改变父亲的值，儿子的值也随着改变，但是改变儿子的值，父亲的值并没有改变，这就是继承但是隔离
          -{}：没有继承父亲的值，所以儿子的值为空，改变任何一方的值都不会影响另一方，这就是不继承且隔离
          -{
            title:"@",//@来进行单向文本（字符串）绑定 <hello-world name="{{name}}"></hello-world>
            title:"=",//=进行双向绑定 <hello-world name="name"></hello-world>
            title:"&",//&调用父作用域中的函数 <hello-world say="say()" name="{{name}}"></hello-world>
           }
         */
        scope: {
          title: "@"
        },
        // require:"",
        template: '<div><h1>{{title}}</h1><div ng-transclude></div></div>',
        transclude: true,
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          // $scope.list="list"
        }
      }
    })
    /**
     * 上下banner轮播图
     * s-list:图片列表，必传
     * s-delay:轮播间隔，单位秒,不传默认5秒
     * s-auto:是否自动轮播，不传默认true
     * e.g.
     * <div njw-slider s-list="sliderList" s-auto="{{3.5}}" s-delay="{{false}}"></div>
     *  $scope.sliderList=[
     *    {img:"static/images/banner0.jpg",url:"#some"},
     *    {img:"static/images/banner1.jpg",url:"#some"},
     *    {img:"static/images/banner2.jpg",url:"#some"}
     *  ]
     */
    .directive("njwSlider", ["$timeout", "Slider", function ($timeout, slider) {
      return {
        restrict: "EA",
        scope: {
          sList: "=",
          sAuto: "@",
          sDelay: "@"
        },
        replace: true,
        templateUrl: app.fileUrlHash('/src/tpl/slider.tpl.html'),
        link: function ($scope, iElm, iAttrs) {
          $scope.current = 0;
          $scope.sliderId = 'slider' + (+new Date);
          $scope.sliderSize = $scope.sList.length;
          $scope.firstItem = $scope.sList[0];
          $scope.lastItem = $scope.sList[$scope.sliderSize - 1];
          if ($scope.sliderSize > 1) {
            $timeout(function () {
              slider.init($scope.sliderId, $scope.sList, $scope, $scope.sDelay, $scope.sAuto);
            }, 0);
            $scope.nextClick = function () {
              slider.next();
            };
            $scope.prevClick = function () {
              slider.prev();
            };
          }
        }
      }
    }])
    /**
     * 下拉选择器
     * placeholder:缺省提示
     * options:下拉列表
     * option-name:下拉选项的文本字段
     * option-value:下拉选项的值字段
     * option-init:下拉框的初始值，可以赋值为选项的值字段或文本字段
     * result:下拉框结果
     * refresh:刷新指令，最好是时间戳
     * change-event：下拉框值改变时调用的事件，参数_name传入的是下拉框的值
     * is-disable:控制选择指令的是否可用
     * e.g.
     * <div njw-selector placeholder="请选择供应商类型" options="typeList"
     * option-name="typeName" option-value="type" option-init="{{supplierType}}"
     * result="supplierType" change-event="changeFn(_name)"
     * is-disable="isDisable"></div>
     */
    .directive("njwSelector", [function () {
      return {
        restrict: "EA",
        templateUrl: app.fileUrlHash("/src/tpl/selector.tpl.html"),
        replace: true,
        scope: {
          placeholder: "@",
          options: "=",
          loopName: "@optionName",
          loopValue: "@optionValue",
          selectInit: "@optionInit",
          result: "=",
          isDisable: "=",
          changeEvent: "&",
          refresh: "@"
        },
        link: function ($scope, iElm, iAttrs) {
          var selecter = angular.element(iElm);
          var input = selecter.find("input");
          var ul = selecter.find("ul");
          var activeOption;
          var id = "njw-selector-" + (+new Date);
          var setActiveOption = function (i) {
            $scope.activeOption = activeOption = i;
          };
          var setOption = function (i, option) {
            var re = option[$scope.loopValue];
            $scope.inputValue = option[$scope.loopName] || option;
            setActiveOption(i);
            if (re === undefined) {
              re = option;
            }
            $scope.result = re;
          };
          var initFn = function () {
            $scope.isPlaceholder = true;
            if ($scope.selectInit !== undefined && $scope.selectInit !== "") {
              if (angular.isArray($scope.options) && $scope.options.length > 0) {
                setOption(0, $scope.options[0]);
                angular.forEach($scope.options, function (v, i) {
                  if ($scope.selectInit == v[$scope.loopValue] || $scope.selectInit == v[$scope.loopName] || $scope.selectInit == v) {
                    setOption(i, $scope.options[i]);
                  }
                });
              } else {
                $scope.inputValue = $scope.selectInit;
              }
              $scope.isPlaceholder = false;
            } else if ($scope.placeholder) {
              $scope.inputValue = $scope.placeholder;
            }
          };
          ul.addClass(id);
          initFn();
          $scope.inputClick = function (e) {
            e.stopPropagation();
            $scope.activeOption = activeOption;
            ul.toggle();
            jQuery.each(jQuery(".njw-selector-list"), function () {
              var me = jQuery(this);
              if (!me.hasClass(id)) {
                me.hide();
              }
            })
          };

          $scope.optionClick = function (i, option) {
            $scope.isPlaceholder = false;
            setOption(i, option);
          };

          $scope.$watch("result", function () {
            $scope.changeEvent({_name: $scope.inputValue});
          });

          $scope.$watch("selectInit", function () {
            initFn();
          }, true);

          $scope.$watch("refresh", function () {
            initFn();
          });

          angular.element("body").on("click", function () {
            ul.hide();//点其它关闭select
          });
        }
      };
    }])
    /**
     * 模块标题栏
     * mc-title:标题
     * mc-more-url:更多按钮链接，不传则不显示“查看更多”，同时标题居中显示
     * mc-type: look-查看更多(不传默认)；more-更多>>
     * mc-more-text:更多的文本
     * e.g.
     * <div module-caption mc-title="找地案例" mc-more-url="#some" ></div>
     */
    .directive("moduleCaption", function () {
      return {
        restrict: "EA",
        scope: {
          mcTitle: "@",
          mcMoreUrl: "@"
        },
        // templateUrl:app.fileUrlHash('/src/tpl/module.caption.tpl.html'),
        template: '<div class="module-caption" ng-class="{\'tc\':!hasMore}"><p class="dis-ib fs-16" ng-class="{\'caption-bar\':mcType===\'look\'}">{{mcTitle}}</p><a class="se-thinner fr" ng-if="hasMore" ng-class="{\'look-more\':mcType===\'look\'}" ng-href="{{mcMoreUrl}}">{{moreText}}</a></div>',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          $scope.hasMore = !!$scope.mcMoreUrl;
          if (iAttrs.mcType === undefined || iAttrs.mcType !== "more") {
            $scope.mcType = "look";
            $scope.moreText =iAttrs.mcMoreText||"查看更多";
          } else {
            $scope.mcType = "more";
            $scope.moreText ="更多 >>";
          }
        }
      }
    })
    /**
     * 模块地块出租、找地列表
     * ml-list:列表数组数据
     * ml-type:出租-rent(不传默认)；找地-look
     * ml-row-size:一行的个数，不传默认3
     * e.g.
     * <div module-list ml-list="landRentList" ml-row-size="4"></div>
     *  $scope.landRentList=[{
     *    title:"清新区石潭镇185亩超优质连片水田出租",
     *    url:"#some",
     *    icon:"/static/images/282x210.jpg",
     *    flags:["出租仓库用地","出租"],
     *    area:"96亩",
     *    price:"900元/亩/年",
     *    address:"清远市清新区"
     *  }]
     *
     * <div module-list ml-list="landLookList" ml-row-size="4" ml-type="look"></div>
     *  $scope.landLookList=[{
     *    title:"按需找地",
     *    url:"#some",
     *    icon:"/static/images/282x210.jpg",
     *    info:"青龙养鸡场项目"
     *  }]
     */
    .directive("moduleList", function () {
      return {
        restrict: "EA",
        scope: {
          mlList: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/module.list.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          if (iAttrs.mlType === undefined || iAttrs.mlType !== "look") {
            $scope.mlType = "rent";
          } else {
            $scope.mlType = "look";
          }
          if (iAttrs.mlRowSize === undefined) {
            $scope.mlRowSize = 3;
          } else {
            $scope.mlRowSize = +iAttrs.mlRowSize;
          }
        }
      }
    })
    /**
     * 土地服务
     * mc-title:标题
     * mc-more-url:更多按钮链接，不传则不显示“查看更多”，同时标题居中显示
     * e.g.
     * <div module-caption mc-title="找地案例" mc-more-url="#some" ></div>
     */
    .directive("landService", ["publicVal",function (publicVal) {
      return {
        restrict: "EA",
        scope: {
          mcTitle: "@",
          mcMoreUrl: "@"
        },
        templateUrl: app.fileUrlHash('/src/tpl/land.service.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          $scope.landService=publicVal.landService;
        }
      }
    }])
    /**
     * 资讯列表
     * nl-list:列表
     *
     * e.g.
     * <div news-list nl-list="gjzcList"></div>
     * $scope.gjzcList=[
     *  {title:"开展2017年度金融支农服务创新试点开展2017年度金融",from:"农业部",date:"18/04/05"},
     *  ...
     * ]
     */
    .directive("newsList", function () {
      return {
        restrict: "EA",
        scope: {
          nlList: "="
        },
        // templateUrl: app.fileUrlHash('/src/tpl/news.list.tpl.html'),
        template:'<ul class="news-list se-shallow" data-date="{{hasDate}}" ng-class="{\'has-news-date\':hasDate}"><li ng-repeat="item in nlList"><a class="ell" ng-href="{{item.url}}">{{item.from}}：{{item.title}}<span ng-if="hasDate">{{item.date | YDM_Date}}</span></a></li></ul>',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          if(!angular.isArray($scope.nlList)) throw new Error("place send the 'nlList' type to 'Array'");
          $scope.hasDate=!!$scope.nlList[0].date;
        }
      }
    })
    /**
     * 图片资讯
     * ni-img:图片资讯数据
     * ni-bottom:标题是否在底部
     * e.g.
     * <div news-img class="mb-14" ni-img="imgData"></div>
     * imgData:{
     *     img: "/static/images/370x252.jpg",
     *     title: "开展2017年度金融支农服务创新试点开展2017年度金融",
     *     from: "农业部",
     *     url: "#some"
     *   }
     */
    .directive("newsImg", function () {
      return {
        restrict: "EA",
        scope: {
          niImg: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/news.img.tpl.html'),
        // template:'',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          // if (iAttrs.uiType === undefined) {
          //   $scope.uiType = 3;
          // } else {
          // }
          $scope.niBottom = !!iAttrs.niBottom;
        }
      }
    })
    /**
     * 分页指令，参数不能为空只有一页不显示组件
     * current-page:当前页
     * total-page:总页数
     * total-record:总共记录数
     * unit:记录的单位，可不传（默认为"条记录"）
     * pager-renew:根据此值的不同来刷新指令
     * get-list:更新列表的函数方法，函数名可改，必须带上一个page参数（表示选中页）
     * e.g.
     * <div njw-pager current-page="1" total-page="1" pager-renew="newPager" get-list="getListByPage(page)"></div>
     */
    .directive("njwPager", ["createItems", function (createItems) {
      return {
        restrict: "EA",
        templateUrl: app.fileUrlHash("/src/tpl/pager.tpl.html"),
        replace: true,
        scope: {
          total: "@totalPage",
          currentPage: "@",
          getList: "&",
          refresh: "=pagerRenew"
        },
        link: function ($scope, iElm, iAttrs) {
          $scope.items = [];
          $scope.pageNum = 1;
          if (!$scope.total || parseInt($scope.total) == 0) {
            $scope.total = 1;
            $scope.currentPage = 1;
          }
          if ($scope.total && $scope.currentPage > $scope.total) {
            throw new Error("当前页数不能大于总页数");
          }
          $scope.$watch("refresh", function (n, o) {
            $scope.currentPage = 1;
            $scope.pageNum = 1;
            $scope.items =createItems($scope.currentPage,$scope.total);
          });
          $scope.$watch("total",function (n,o) {
            $scope.items =createItems($scope.currentPage,$scope.total);
          });

          $scope.items =createItems($scope.currentPage,$scope.total);

          $scope.itemClick = function (e) {
            var target = e.target || e.srcElement;
            var itemType = target.getAttribute("item-click");
            var total = +$scope.total;
            $scope.currentPage = +$scope.currentPage;
            if (itemType === "prev" && $scope.currentPage > 1) {
              $scope.currentPage--;
            } else if (itemType === "next" && $scope.currentPage < total) {
              $scope.currentPage++;
            } else if (itemType === "num") {
              $scope.currentPage = parseInt(target.innerHTML);
            } else {
              return;
            }
            $scope.pageNum = $scope.currentPage;
            if (itemType) {
              $scope.getList({
                page: $scope.currentPage
              });
              $scope.items =createItems($scope.currentPage,$scope.total);
              //回滚到顶部
              // jq("html,body").animate({"scrollTop": 0});
            }
          };
        }
      };
    }])
});