define(['app'], function (app) {
  'use strict';

  app
    .value("publicVal", {
      menus: [
        {title: "首页", url: "main"},
        {title: "我要找地", url: "findland"},
        {title: "金融服务", url: "main"},
        {title: "涉农服务", url: "main"},
        {title: "土地资讯", url: "main"}
      ],
      serverTel: "020-87595266",
      landService:[
        {
          title:"金融服务",
          info:"多家金融机构合作解决经营方仔细需求",
          url:"#some"
        },
        {
          title:"农业电商",
          info:"地区特色农产品交易B端、C端客户对接",
          url:"#some"
        },
        {
          title:"农资农机",
          info:"专业农资、农机服务商对接保障农业生产经营",
          url:"#some"
        },
        {
          title:"农业技术",
          info:"农业技术 专业农业技术知识普及行业专家咨询",
          url:"#some"
        },
        {
          title:"土地招商",
          info:"土地项目招商引资土地项目推介",
          url:"#some"
        }
      ]
    })
    .factory("njyCookie", [function () {
      function setCookie(name, value, domain, day) {
        var Days = day || 0.5;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() +
          (domain ? (";domain=" + domain) : "") + ";path=/";
      }

      function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
        } else {
          return "";
        }
      }

      //删除cookies
      function delCookie(name) {
        setCookie(name, "", null, -1);
      }

      return {
        setCookie: setCookie,
        getCookie: getCookie,
        delCookie: delCookie
      };
    }])
    .factory("njyUrlUtil", function () {
      return {
        getFromURL: function (url, parameter) {
          var index = url.indexOf("?");
          if (typeof(parameter) == "undefined" || parameter == "") {
            return "";
          }
          if (index != -1) {
            var parameterString = url.substr(index + 1);
            var reg = new RegExp("(^|&)" + parameter + "=([^&]*)(&|$)", "i");
            var r = parameterString.match(reg);
            if (r != null) {
              return r[2];
            }
          }
          return "";
        },
        get: function (parameter) {
          return this.getFromURL(window.location.href, parameter);
        },
        getInt: function (parameter, defaultValue) {
          var value = parseInt(this.get(parameter));
          return isNaN(value) ? (typeof(defaultValue) == "undefined" ? 0 : defaultValue) : value;
        },
        getDecoded: function (parameter) {
          var res = this.get(parameter);
          if (res) {
            res = this.decode(res);
          }
          return res;
        },
        decode: function (srcStr) {
          if (typeof(srcStr) == "undefined") {
            return "";
          }
          return decodeURIComponent(srcStr);
        },
        encode: function (srcStr) {
          if (typeof(srcStr) == "undefined") {
            return "";
          }
          return encodeURIComponent(srcStr);
        },
        getSymbol: function (url) {
          return url.indexOf("?") == -1 ? "?" : "&";
        },
        joinURL: function (url, queryString) {
          return url + this.getSymbol(url) + queryString;
        },
        createQueryString: function (obj) {
          var a = [];
          for (var p in obj) {
            if (typeof(obj[p]) == "function" || obj[p] == null || typeof(obj[p]) == "undefined") continue;
            a.push(p + "=" + obj[p]);
          }
          return a.join("&");
        }
      };

    })
    .factory("njyGetDateDiff", function () {
      return function (_dateTime) {
        if (!_dateTime) return "";
        var dateTimeStamp = new Date(Date.parse(_dateTime.replace(/-/g, "/"))).getTime();
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
          return "刚刚";
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        var result;
        if (monthC >= 1) {
          result = "" + parseInt(monthC) + "月前";
        } else if (dayC >= 1) {
          result = "" + parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
          result = "" + parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
          result = "" + parseInt(minC) + "分钟前";
        } else
          result = "刚刚";
        return result;
      }
    })
    .factory("njyImage", ["$q", "$interval", function ($q, $interval) {
      //快速得到图片的宽高
      var getImgWH = function (url) {
        var deferred = $q.defer();
        var img = new Image();
        var check, set;
        img.src = url;
        check = function () {
          if (img.width > 0 || img.height > 0) {
            $interval.cancel(set);
            deferred.resolve({w: img.width, h: img.height});
          }
        };
        set = $interval(check, 40, 20);
        set.then(function () {
          deferred.reject();
        });
        img.onload = function () {
          check();
        };
        return deferred.promise;
      };

      return {
        getImgWH: getImgWH
      };
    }])
    .service("Slider", ["$timeout", function ($timeout) {
      return {
        list: [],
        delay: 5000,
        autoSlider: true,
        timer: null,
        height: 400,
        current: 0,
        speed: 200,
        slider: function (direction, cb) {
          var distance = 0, that = this;
          if (direction === "down") {
            this.current--;
            if (this.current < 0) {
              this.current = this.last - 1;
            }
            distance = this.distance - this.height;
          } else {
            this.current++;
            if (this.current >= this.last) {
              this.current = 0;
            }
            distance = this.distance + this.height;
          }
          that.$scope.current = that.current;

          //轮播动画中暂不进行处理
          that.isAnimated = false;
          this.dom.animate({"margin-top": "-" + distance + "px"}, this.speed, "linear", function () {
            var dis = 0;
            if (distance === 0) {
              dis = that.lastDistance - that.height;
            } else if (distance === that.lastDistance) {
              dis = that.height;
            }
            if (dis > 0) {
              that.dom.css({"margin-top": "-" + dis + "px"});
              that.distance = dis;
            } else {
              that.distance = distance;
            }
            that.isAnimated = true;

            typeof(cb) === "function" && cb();
          });
        },
        move: function (dir) {
          var that = this;
          this.slider(dir, function () {
            that.autoSlider&&that.start();
          });
        },
        next: function () {
          this.cancelTimer();
          this.move("up");
        },
        prev: function () {
          this.cancelTimer();
          this.move("down");
        },
        start: function () {
          var that = this;
          that.timer = $timeout(function () {
            that.move("up");
          }, that.delay);
        },
        cancelTimer: function () {
          $timeout.cancel(this.timer);
        },
        reset: function () {
          this.size = this.list.length;
          this.last = this.size;
          this.lastDistance = (this.size + 1) * this.height;
          this.distance = this.height;
          this.isAnimated = true;
        },
        init: function (id, list, $scope, delay, auto) {
          this.dom = jQuery("#" + id);
          this.list = list;
          this.$scope = $scope;
          typeof delay === 'number' && (this.delay = delay * 1000);
          typeof auto === 'boolean' && (this.autoSlider = auto);
          this.reset();
          this.autoSlider && this.start();
        }
      };
    }])
    //组建页码item
    .factory("createItems", function () {
      return function (currentPage,total) {
        var preI = 5,
          nextI = 3,
          i = 0,
          items = [],
          c = currentPage,
          t = total;

        if (t < 6) {
          for (i = 1; i <= t; i++) {
            items.push({
              name: i,
              click: "num"
            });
          }
          return items;
        }

        if (c < 5) {
          for (i = 1; i < 6; i++) {
            items.push({
              name: i,
              click: "num"
            });
          }
          items.push({
            name: "...",
            click: "dot"
          });
          return items;
        }

        //组建当前页的后3个
        items.push({
          name: c,
          click: "num"
        });
        for (i = c + 1; i <= t; i++) {
          if (--nextI > -1) {
            items.push({
              name: i,
              click: "num"
            });
            if (nextI == 0 && t > i) {
              items.splice(items.length - 1, 1, {
                name: "...",
                click: "dot"
              });
            }
          } else {
            break;
          }
        }
        //组建当前页的前5个
        for (i = c - 1; i > 0; i--) {
          if (--preI > -1) {
            items.splice(0, 0, {
              name: i,
              click: "num"
            });
            if (preI == 2) {
              if (i > 3) {
                items.splice(0, 1, {
                  name: 1,
                  click: "num"
                }, {
                  name: 2,
                  click: "num"
                }, {
                  name: "...",
                  click: "dot"
                });
                break;
              }
            }
          } else {
            break;
          }
        }
        return items;
      };
    })


});