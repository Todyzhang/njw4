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
     * 限制input框输入，只能输入数字，属性值为限制的数字位数,负数不限制；0表示不限制位数；正数为限制输入的位数
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
          if (!ngModel||size<0) return;
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
    /**
     * 上下banner轮播图
     * s-list:图片列表，必传
     * s-delay:轮播间隔，单位秒,不传默认5秒
     * s-auto:是否自动轮播，不传默认true
     * e.g.
     * <div slider-longitudinal s-list="sliderList" s-delay="{{3.5}}" s-auto="{{false}}"></div>
     *  $scope.sliderList=[
     *    {img:"static/images/banner0.jpg",url:"#some"},
     *    {img:"static/images/banner1.jpg",url:"#some"},
     *    {img:"static/images/banner2.jpg",url:"#some"}
     *  ]
     */
    .directive("sliderLongitudinal", ["$timeout", "Slider", function ($timeout, slider) {
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
          sList: "="
        },
        replace: true,
        templateUrl: app.fileUrlHash('/src/tpl/slider.longitudinal.tpl.html'),
        link: function ($scope, iElm, iAttrs) {
          var descSlider = {
            current: 0,
            id: 'slider' + (+new Date),
            list: $scope.sList,
            size: $scope.sList.length,
            firstItem: $scope.sList[0]
          };
          descSlider.lastIndex = descSlider.size - 1;
          descSlider.lastItem = $scope.sList[descSlider.lastIndex];
          if (iAttrs.sAuto === undefined || iAttrs.sAuto !== "false") {
            descSlider.auto = true;
          } else {
            descSlider.auto = false;
          }
          if (/\d+/.test(iAttrs.sDelay)) {
            descSlider.sDelay = +iAttrs.sDelay;
          } else {
            descSlider.sDelay = 5;
          }
          descSlider.direct = "upDown";

          $scope.descSlider = descSlider;
          if (descSlider.size > 1) {

            $timeout(function () {
              slider.init(descSlider);
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
     * 左右banner轮播图，主要用于地块详情图片展示
     * s-list:图片列表，必传
     * s-delay:轮播间隔，单位秒,不传默认5秒
     * s-auto:是否自动轮播，不传默认false
     * e.g.
     * <div slider-landscape s-list="sliderList" s-delay="{{3.5}}" s-auto="{{false}}"></div>
     *  $scope.sliderList=[
     *    {img:"static/images/banner0.jpg",url:"#some"},
     *    {img:"static/images/banner1.jpg",url:"#some"},
     *    {img:"static/images/banner2.jpg",url:"#some"}
     *  ]
     */
    .directive("sliderLandscape", ["$timeout", "Slider", function ($timeout, slider) {
      return {
        restrict: "EA",
        scope: {
          sList: "="
        },
        replace: true,
        templateUrl: app.fileUrlHash('/src/tpl/slider.landscape.tpl.html'),
        link: function ($scope, iElm, iAttrs) {
          var descSlider = {
            id: 'slider' + (+new Date),
            width: 570,
            direct: "leftRight",
            current: 0
          };
          if (iAttrs.sAuto === undefined || iAttrs.sAuto !== "true") {
            descSlider.auto = false;
          } else {
            descSlider.auto = true;
          }
          if (/\d+/.test(iAttrs.sDelay)) {
            descSlider.sDelay = +iAttrs.sDelay;
          } else {
            descSlider.sDelay = 5;
          }
          var init=function () {
            descSlider.list=$scope.sList;
            descSlider.size = $scope.sList.length;
            descSlider.firstItem = $scope.sList[0];
            descSlider.lastIndex = descSlider.size - 1;
            descSlider.lastItem = descSlider.list[descSlider.lastIndex];
            descSlider.totalDis = (descSlider.size + 2) * descSlider.width;
            $scope.descSlider = descSlider;

            slider.init(descSlider);
          };


          $scope.nextClick = function () {
            descSlider.current !== descSlider.lastIndex && slider.next();
          };
          $scope.prevClick = function () {
            descSlider.current !== 0 && slider.prev();
          };
          $scope.descItemClick = function (index) {
            slider.moveTo(index);
          };

          $scope.$watch("sList",function () {
            init();
          },true);

        }
      }
    }])
    /**
     * 输入框
     * emc-title:标题
     * emc-btn-name:按钮名称，不传则不显示按钮
     * emc-btn-click:按钮点击事件（如有）
     * e.g.
     * <div end-module-caption emc-title="基本信息" emc-btn-name="+ 新增土地资源" emc-btn-click="btnClickFn" ></div>
     */
    .directive("njwInput", function () {
      return {
        restrict: "EA",
        scope: {
          field: "=niData",
          niTitle: "@",
          result: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/input.tpl.html'),
        // template: '',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          $scope.someModel = $scope.field.value;

          $scope.$watch("someModel", function () {
            $scope.result = $scope.someModel;
          })
          // $scope.btnClick=function () {
          // $scope.emcBtnClick();
          // }
        }
      }
    })
    .directive("njwInputSelect", function () {
      return {
        restrict: "EA",
        scope: {
          field: "=nisData",
          placeholder: "@",
          clickEvent: "&",
          inputText: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/input.select.tpl.html'),
        // template: '',
        replace: true,
        link: function ($scope, iElm, iAttrs) {

          var init = function () {
            if ($scope.placeholder) {
              $scope.inputValue = $scope.placeholder;
            }
          };

          $scope.isPlaceholder = true;

          init();

          $scope.$watch("inputText", function (n) {
            if (n) {
              $scope.inputValue = n;
              $scope.isPlaceholder = false;
            }
          });

        }
      }
    })
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
          var ul = selecter.find(".njw-selector-list");
          var activeOption;
          var id = "njw-selector-" + (+new Date);
          var setActiveOption = function (i) {
            $scope.activeOption = activeOption = i;
          };
          $scope.list = [1, 2, 3];
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

          $scope.$watch("result", function (n) {
            n && $scope.changeEvent({_name: $scope.inputValue, _value: $scope.result});
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
     * 多级级联
     * mc-title:标题
     * mc-more-url:
     * mc-type:
     * mc-more-text:
     * e.g.
     * <div module-caption mc-title="找地案例" mc-more-url="#some" ></div>
     */
    .directive("njwSelectorGroup", function () {
      return {
        restrict: "EA",
        scope: {
          selectorData: "=",
          nsgTitle: "@",
          result: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/selector.group.tpl.html'),
        // template: '',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          $scope.selectors = ($scope.selectorData&&$scope.selectorData.selectors)||[];
          for (var i = 0, len = $scope.selectors.length; i < len; i++) {
            var refreshIndex = i;
            $scope.$watch("selectorData.selectors[" + i + "].list", function () {
              $scope.selectorData.selectors[refreshIndex]["refresh"] = +new Date;
            }, true);
            if (i == len - 1) {
              $scope.$watch("selectorData.selectors[" + i + "].value", function (newValue, oldValue) {
                $scope.result = newValue;
              })
            }
          }
        }
      }
    })
    /**
     * 输入框+下拉选择器
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
    .directive("njwSelectorInput", ["$document", "$timeout", function ($document, $timeout) {
      return {
        restrict: "EA",
        templateUrl: app.fileUrlHash("/src/tpl/selector.input.tpl.html"),
        replace: true,
        scope: {
          selectorData: "=",
          nsiTitle: "@",
          result1: "=",
          result2: "="
        },
        link: function ($scope, iElm, iAttrs) {
          var selecter = angular.element(iElm);
          var ul = selecter.find(".njw-selector-list");
          var rightTips = selecter.find(".right-tips");
          var activeOption,
            selectorName = $scope.selectorData.optionName,
            selectorValue = $scope.selectorData.optionValue;

          var setActiveOption = function (i) {
            $scope.activeOption = activeOption = i;
          };
          var setTipsWidth = function () {
            $timeout(function () {
              $scope.rightTips = rightTips.width() + 'px';
            }, 0);
          };
          var setOption = function (i, option) {
            $scope.selectorName = option[selectorName];
            $scope.selectorData.selectorValue = option[selectorValue];
            $scope.result2 = option[selectorValue];
            setActiveOption(i);
            setTipsWidth();
          };

          $scope.selectorClick = function (e) {
            e.stopPropagation();
            $scope.activeOption = activeOption;
            var isShow = ul.css("display") === "block";
            angular.element(".njw-selector-list").hide();
            if (!isShow) ul.show();
          };

          $scope.optionClick = function (i, option) {
            setOption(i, option);
          };

          $scope.$watch("selectorData.refresh", function () {
            setOption(0, $scope.selectorData.list[0]);
          });
          $scope.$watch("inputValue", function (newValue, oldValue) {
            $scope.result1 = newValue;
          });
          //初始值更新
          $scope.$watch("selectorData.initSelectorValue", function (newValue, oldValue) {
            var index = 0, option = null;
            if (!newValue) return;
            angular.forEach($scope.selectorData.list, function (v, i) {
              if (newValue == v.name || newValue == i) {
                index = i;
                option = v;
              }
            });
            setOption(index, option);
          });
          $document.on("click", function () {
            ul.hide();//点其它关闭select
          })
        }
      };
    }])
    /**
     * 下拉多选选择器
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
    .directive("njwSelectorMulti", ["$document", "$timeout", function ($document, $timeout) {
      return {
        restrict: "EA",
        templateUrl: app.fileUrlHash("/src/tpl/selector.multi.tpl.html"),
        replace: true,
        scope: {
          nsmTitle: "@",//标题
          nmsPlaceholder: "@",
          nsmSize: "@",//最多可添加数量
          nsmList: "=", //下拉框数据
          optionName: "@",//下拉框显示名字字段
          optionValue: "@",//下拉框选中的值字段
          result: "="
        },
        link: function ($scope, iElm, iAttrs) {
          var selecter = angular.element(iElm);
          var ul = selecter.find(".njw-selector-list");
          var activeOption;
          $scope.result = "";

          $scope.selectedList = [];

          $scope.delectBtn = function (index, option) {
            $scope.selectedList.splice(index, 1);
            $scope.result.replace(option[$scope.optionValue] + ",", "");
          };


          var setActiveOption = function (i) {
            $scope.activeOption = activeOption = i;
          };

          var setOption = function (i, option) {
            var id = option[$scope.optionValue] + ",";
            if ($scope.result.indexOf(id) === -1) {
              $scope.selectedList.push(option);
              $scope.result += id;
              setActiveOption(i);
            }

          };


          $scope.selectorClick = function (e) {
            e.stopPropagation();
            $scope.activeOption = activeOption;
            var isShow = ul.css("display") === "block";
            angular.element(".njw-selector-list").hide();
            if (!isShow) ul.show();
          };

          $scope.optionClick = function (i, option) {
            setOption(i, option);
          };

          // $scope.$watch("selectorData.refresh", function () {
          //   $scope.selectorName=$scope.selectorData.list[0][selectorName];
          // });

          $document.on("click", function () {
            ul.hide();//点其它关闭select
          })
        }
      };
    }])
    /**
     * 模块标题栏
     * mc-title:标题
     * mc-more-url:更多按钮链接，不传则不显示“查看更多”，同时标题居中显示；传left表示让标题向左对齐
     * mc-type: look-查看更多(不传默认)；more-更多>>
     * mc-more-text:更多的文本
     * mc-target:a标签打开方式
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
        templateUrl: app.fileUrlHash('/src/tpl/module.caption.tpl.html'),
        // template: '',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          $scope.hasMore = !!$scope.mcMoreUrl;
          if (iAttrs.mcType === undefined || iAttrs.mcType !== "more") {
            $scope.mcType = "look";
            $scope.moreText = iAttrs.mcMoreText || "查看更多";
          } else {
            $scope.mcType = "more";
            $scope.moreText = "更多 >>";
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
    .directive("landService", ["publicVal", function (publicVal) {
      return {
        restrict: "EA",
        scope: {
          mcTitle: "@",
          mcMoreUrl: "@"
        },
        templateUrl: app.fileUrlHash('/src/tpl/land.service.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          $scope.landService = publicVal.landService;
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
        templateUrl: app.fileUrlHash('/src/tpl/news.list.tpl.html'),
        // template:'',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          if (!angular.isArray($scope.nlList)) throw new Error("place send the 'nlList' type to 'Array'");
          $scope.hasDate = !!$scope.nlList[0].date;
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
            $scope.items = createItems($scope.currentPage, $scope.total);
          });
          $scope.$watch("total", function (n, o) {
            $scope.items = createItems($scope.currentPage, $scope.total);
          });

          $scope.items = createItems($scope.currentPage, $scope.total);

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
              $scope.items = createItems($scope.currentPage, $scope.total);
              //回滚到顶部
              // angular.element("html,body").animate({"scrollTop": 0})
            }
          };
        }
      };
    }])
    /**
     * 合作伙伴模块
     * p-list:伙伴数组
     * mc-title:模块头名称
     * e.g.
     * <div partners p-list="partners" mc-title="合作机构"></div>
     * $scope.partners=[
     *  {img:"/static/images/partner.png",url:"#some"},
     *  ...
     * ]
     */
    .directive("partners", function () {
      return {
        restrict: "EA",
        scope: {
          pList: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/partners.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          if (!angular.isArray($scope.pList)) throw new Error("place send the 'nlList' type to 'Array'");
          $scope.mcTitle = iAttrs.mcTitle;
        }
      }
    })
    /**
     * 模块标题栏
     * emc-title:标题
     * emc-btn-name:按钮名称，不传则不显示按钮
     * emc-btn-click:按钮点击事件（如有）
     * e.g.
     * <div end-module-caption emc-title="基本信息" emc-btn-name="+ 新增土地资源" emc-btn-click="btnClickFn" ></div>
     */
    .directive("endModuleCaption", function () {
      return {
        restrict: "EA",
        scope: {
          emcTitle: "@",
          emcBtnName: "@",
          emcBtnClick: "&"
        },
        templateUrl: app.fileUrlHash('/src/tpl/end.module.caption.tpl.html'),
        // template: '',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          // $scope.btnClick=function () {
          // $scope.emcBtnClick();
          // }
        }
      }
    })
    /**
     * 上传图片
     * emc-title:标题
     * emc-btn-name:按钮名称，不传则不显示按钮
     * emc-btn-click:按钮点击事件（如有）
     * e.g.
     * <div end-module-caption emc-title="基本信息" emc-btn-name="+ 新增土地资源" emc-btn-click="btnClickFn" ></div>
     */
    .directive("njwImgUpload", ["uploadImg", "publicVal","ajaxErrorHandle","njwAlert", function (uploadImg, publicVal,ajaxErrorHandle,njwAlert) {
      return {
        restrict: "EA",
        scope: {
          niuImgs: "=",
          niuSize: "@",//图片大小
          niuLen: "@",//图片张数
          subPath: "@",
          result: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/img.upload.tpl.html'),
        // template: '',
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          var $dom = angular.element(iElm);
          var $inputFile = $dom.find(".njwImgFile");
          var _form = $dom.find(".imgUploadForm")[0];
          var limitSize;
          $scope.imgHost = publicVal.imgHost;
          $scope.len = +($scope.niuLen || 1);
          $scope.size = +($scope.niuSize || 3);
          limitSize = $scope.size * 1024 * 1024;
          $scope.deleteBtn = function (index) {
            // angular.isArray($scope.delId) && $scope.delId.push(imgId);
            $scope.niuImgs.splice(index, 1);
          };

          var uploadFn = function () {
            uploadImg.upload(_form)
              .then(function (data) {
                /*
                 compressImageName:item.smallImagePath,
                 compressImagePath :item.smallImageUrl,
                 originImageName : item.imagePath,
                 originImagePath : item.imageUrl,
                 seq :i,
                 uuid:item.uuid
                 */
                if (data && data.success) {
                  var len = $scope.niuImgs.length;
                  if (len >= $scope.len) return;//网络延时可能会导致上传数量超出，去掉多的数据

                  $scope.niuImgs.push(data.t);
                } else {
                  //上传失败
                  ajaxErrorHandle(data.errorMessage,"上传图片失败！");
                }
              }, function () {
                //上传失败
                ajaxErrorHandle(data.errorMessage,"上传图片失败！");
              })
              .then(function () {
                _form.reset();//清空file input中的文件
              });
          };

          $inputFile.on("change", function (e) {
            var self = this;
            var specialCharReg = /^(\w|[\u4e00-\u9fa5]|[\-\(\)（）])+\.[A-Za-z0-9]+$/;
            var file = self.files && self.files[0];
            var filePathName = self.value;
            var pathAry = filePathName.split(/\\|\//);
            var fileName = pathAry[pathAry.length - 1];
            if (!/\.(png|jpeg|jpg|gif)$/.test(fileName.toLocaleLowerCase())) {
              njwAlert.warn("请选择png|jpeg|jpg|gif格式的图片上传");
              _form.reset();
              return false;
            }
            if (!specialCharReg.test(fileName)) {
              njwAlert.warn("文件名不能含有特殊字符，请修改后重新上传。");
              _form.reset();
              return false;
            }
            if (fileName.split(".")[0].length > 80) {
              njwAlert.warn("该文件名超过80字，请修改后重新上传。");
              _form.reset();
              return false;
            }
            //支持html5 file判断大小
            if (file && file.size && file.size > limitSize) {
              njwAlert.warn("图片文件不能大于" + $scope.size + "MB，请修改后重新上传。");
              _form.reset();
              return false;
            }

            uploadFn();
          });


          $scope.$watch("niuImgs", function (n, o) {
            for (var i = 1; i < 7; i++) {
              $scope.result["img" + i] = "";
            }
            angular.forEach(n, function (v, i) {
              $scope.result["img" + (i + 1)] = v;
            })
          }, true);
        }
      }
    }])
    .directive("checkbox", [function () {
      return {
        restrict: "EA",
        scope: {
          cbTitle: "@",
          value: "="
        },
        template: '<a class="checkbox-icon dis-ib" ng-class="value?\'active\':\'\'" ng-click="value=!value">{{cbTitle}}</a>',
        // templateUrl:app.fileUrlHash('/src/tpl/checkbox.group.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          $scope.clickFn = function () {
            $scope.value = !$scope.value;
          }
        }
      }
    }])
    .directive("checkboxGroup", [function () {
      return {
        restrict: "EA",
        scope: {
          cgList: "=",
          result: "="
        },
        // template: '<a class="checkbox-icon dis-ib" ng-class="{\'active\':value}" ng-click="value=!value">{{cbTitle}}</a>',
        templateUrl: app.fileUrlHash('/src/tpl/checkbox.group.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          $scope.$watch("cgList", function (n, o) {
            var val = "";
            angular.forEach(n, function (v) {
              if (v.value) val += v.id + ",";
            });
            $scope.result = val;
          }, true)
        }
      }
    }])
    /**
     * 下拉对话框组件
     */
    .directive("selectDialog", ["$timeout", function ($timeout) {
      return {
        restrict: "EA",
        scope: {
          sdData: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/select.dialog.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {

          var levelMsg = {},
            conf = {
              placeholder: "请选择",
              show: false,//显示对话框
              target: angular.element("body"),
              level: 1,
              reBackTip: {"2": "返回上一层"},
              data: [
                {id: 0, name: "信息"}
              ],
              itemClick: function (data) {
                console.log(data);
              },
              result: null,
              setResult: function () {
              }
            };
          var winWidth = angular.element("body").width();
          var dialogWidth = 480;

          //重置组件位置信息
          var setWrapPos = function () {
            var target = angular.element($scope.sdData.target),
              offset, left, top, width, height,
              arrowRight = "auto";

            if (target) {
              offset = target.offset();
              width = target.outerWidth();
              height = target.height();
              left = offset.left;
              top = offset.top + height + 20;

              if (left + dialogWidth > winWidth) {
                left = left + width - dialogWidth;
                arrowRight = "20px"
              }
              $scope.wrapPos = {
                left: left,
                top: top,
                arrowRight: arrowRight,
                height: angular.element(".page-container").height()
              };

            }

          };

          var reset = function () {
            var list;
            $scope.sdData = angular.extend(conf, $scope.sdData || {});
            list = $scope.sdData.data;
            $scope.currentItem = -1;
            $scope.level = 1;
            levelMsg = {"1": {index: 1, list: list}};
            $scope.curList = list;
            setWrapPos();
          };

          // var renew=function () {
          //   reset();
          // };


          $scope.itemClick = function (data, index) {
            var names = "";
            $scope.currentItem = index;
            levelMsg[$scope.level] = {index: index, list: $scope.curList};
            $scope.level++;
            if ($scope.level > $scope.sdData.level) {
              $scope.sdData.show = false;
              if (typeof $scope.sdData.setResult === "function") {
                angular.forEach(levelMsg, function (value, key) {
                  if (key <= $scope.sdData.level)
                    names += (names ? " " : "") + value.list[value.index]["name"];
                });

                $scope.sdData.setResult(data, names);
              }
            } else {
              $scope.currentItem = -1;
              if (typeof $scope.sdData.itemClick === "function") {
                data.children = [];
                $scope.sdData.itemClick(data, function () {
                  $scope.curList = data.children;
                });
              }

            }

            $scope.sdData.result = data;
          };

          //返回上一级
          $scope.reBack = function () {
            var msg;
            $scope.level--;
            msg = levelMsg[$scope.level];
            $scope.curList = msg.list;
            $scope.currentItem = msg.index;
          };


          //重置下拉对话框位置信息
          $scope.$watch("sdData.show", function (n, o) {
            if (n) {
              reset();
            }
          });

          //对结果函数进行处理(关闭对话框返回处理结果)
          // $scope.$watch("sdData.result",function (n,o) {
          //   if(!n){
          //     renew();
          //   }
          // });

        }
      }
    }])
    .directive("alertDialog", [function () {
      return {
        restrict: "EA",
        scope: {
          adData: "="
        },
        // template: '<a class="checkbox-icon dis-ib" ng-class="{\'active\':value}" ng-click="value=!value">{{cbTitle}}</a>',
        templateUrl: app.fileUrlHash('/src/tpl/alert.dialog.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {

          $scope.btnClick = function (i) {
            var cb = $scope.adData.data.btns[i]["cb"];
            typeof(cb) === "function" && cb();
            $scope.adData.show = false;
          };

        }
      }
    }])
    /**
     * 提交土地需求form
     */
    .directive("findLandForm", ["queryClassify","soilDemand","njwAlert","publicVal","$rootScope",
      function (queryClassify,soilDemand,njwAlert,publicVal,$rootScope) {
      return {
        restrict: "EA",
        scope: {
          adData: "="
        },
        templateUrl: app.fileUrlHash('/src/tpl/find.land.form.tpl.html'),
        replace: true,
        link: function ($scope, iElm, iAttrs) {
          var selectAddr, selectLandType, getCityList, getTypeList,
            isInSubmit = false;
          /*
            SoilDemandVo {
            acreage (integer, optional): 土地面积(单位亩) ,
            areaId (integer, optional): 城市区域id ,
            describe (string, optional): 描述(不能为空,140个字符内.) ,
            managementTypesId (integer, optional): 土地经营类型 ,
            phone (string, optional): 手机号
            }
         */
          $scope.needLandForm = {
            acreage: "",
            areaId: "",
            describe: "",
            managementTypesId: "",
            phone: ""
          };

          $scope.landTypeName = "";
          $scope.addrsText = "";

          selectAddr = {
            placeholder: "地区选择",
            show: false,
            level: 3,
            reBackTip: {"2": "其它省份", "3": "其它城市"},
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
            setResult: function (data, names) {
              $scope.addrsText = names;
              $scope.needLandForm.areaId = data.id;
            }
          };

          getCityList = function () {
            var list = [];
            angular.forEach(publicVal.provinceArea, function (_d) {
              list.push({id: _d.id, name: _d.name});
            });
            selectAddr.data = list;
          };

          $scope.selectCity = function (e) {
            var target = e.target || e.srcElement;
            selectAddr.target = angular.element(target).parent();
            selectAddr.show = true;
            if (selectAddr.data.length === 0) {
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
            setResult: function (data, names) {
              $scope.landTypeName = names;
              $scope.needLandForm.managementTypesId = data.id;
            }
          };

          getTypeList = function () {
            var list = [];
            angular.forEach(publicVal.landType, function (_d) {
              list.push({id: _d.id, name: _d.name});
            });
            selectLandType.data = list;
          };

          $scope.selectType = function (e) {
            var target = e.target || e.srcElement;
            selectLandType.target = angular.element(target).parent();
            selectLandType.show = true;
            if (selectLandType.data.length === 0) {
              getTypeList();
            }
            $rootScope.selectDialogData = selectLandType;
          };

          $scope.addNeedLand = function () {
            if (!isInSubmit) {
              isInSubmit = true;
              $scope.needLandForm.acreage = +$scope.needLandForm.acreage;
              soilDemand.addSoil($scope.needLandForm)
                .then(function () {
                  njwAlert.right("提交成功，我们将安排专人和您对接！");
                  isInSubmit = false;
                }, function (err) {
                  njwAlert.wrong("提交失败，请稍后重试！");
                  isInSubmit = false;
                })
            }
          };
        }
      }
    }])
});