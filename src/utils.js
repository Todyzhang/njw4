define(['app','angular'], function (app,angular) {
  'use strict';

  app
    .constant("MENUS",{
      "main":{title: "首页", url: "#/main",index:0},
      "findland":{title: "我要找地", url: "#/findland",index:1},
      "financial":{title: "金融服务", url: "#/financial",index:2},
      "agroService":{title: "涉农服务", url: "#/agro-service",index:3},
      "news":{title: "土地资讯", url: "#/news",index:4}
    })
    .factory("publicVal", ["MENUS",function (MENUS) {
      var val={
        // menus: [
        //   {title: "首页", url: "main"},
        //   {title: "我要找地", url: "findland"},
        //   {title: "金融服务", url: "financial"},
        //   {title: "涉农服务", url: "agroService"},
        //   {title: "土地资讯", url: "news"}
        // ],
        serverTel: "020-87595266"
      };
      val.menus=(function () {
        var ary=[];
        angular.forEach(MENUS,function(value, key){
          ary[value.index]=value;
        });
        return ary;
      })();
      val.landService=[
        {
          title:"金融服务",
          info:"多家金融机构合作解决经营方仔细需求",
          url:val.menus.url
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
      ];
      return val;
    }])
    .factory("njwCookie", [function () {
      function setCookie(name, value, domain, day) {
        var days = day || 0.5,exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() +
          (domain ? (";domain=" + domain) : "") + ";path=/";
      }

      function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return decodeURIComponent(arr[2]);
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
    .factory("njwUrlUtil", function () {
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
    .factory("njwGetDateDiff", function () {
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
    .factory("njwImage", ["$q", "$interval", function ($q, $interval) {
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
        width:570,
        direct:'upDown',//'upDown'(default) or 'leftRight'
        current: 0,
        speed: 200,
        slide: function (direction, cb,size) {
          var distance = 0, that = this,param={};
          if (direction === "down"||direction === "left") {
            this.current-=size;
            if (this.current < 0) {
              this.current = this.last - 1;
            }
            distance = this.distance - this.sliderData.distance*size;
          } else {
            this.current+=size;
            if (this.current >= this.last) {
              this.current = 0;
            }
            distance = this.distance + this.sliderData.distance*size;
          }
          that.$scope.current = that.current;

          that.isAnimated = false;
          param[that.sliderData.sliderParam]="-" + distance + "px";
          this.dom.animate(param, this.speed, "linear", function () {
            var dis = 0;
            if (distance === 0) {
              dis = that.lastDistance - that.height;
            } else if (distance === that.lastDistance) {
              dis = that.height;
            }
            if (dis > 0) {
              that.dom.css(that.sliderData.sliderParam, "-" + dis + "px");
              that.distance = dis;
            } else {
              that.distance = distance;
            }
            that.isAnimated = true;

            typeof(cb) === "function" && cb();
          });
        },
        move: function (dir,desc) {
          var that = this;
          this.cancelTimer();
          this.slide(dir, function () {
            that.autoSlider&&that.start();
          },desc||1);
        },
        moveTo:function (index) {
          var desc=index-this.current,
            dir;
          if(desc>0){
            dir="nextDirect";
          }else if(desc<0){
            dir="prevDirect"
          }
          dir&&this.move(this.sliderData[dir],Math.abs(desc));
        },
        next: function () {
          this.move(this.sliderData.nextDirect);
        },
        prev: function () {
          this.move(this.sliderData.prevDirect);
        },
        start: function () {
          var that = this;
          that.timer = $timeout(function () {
            that.move(that.sliderData.nextDirect);
          }, that.delay);
        },
        clearAnimate:function () {
          //轮播动画中暂不进行处理
          this.isAnimated&&this.dom.stop();
        },
        cancelTimer: function () {
          $timeout.cancel(this.timer);
          // this.clearAnimate();
        },
        reset: function () {
          this.size = this.list.length;
          this.last = this.size;
          this.lastDistance = (this.size + 1) * this.sliderData.distance;
          this.distance = this.sliderData.distance;
          this.isAnimated = true;
        },
        //params:id, list, delay, auto,direct
        init: function (param) {
          var id=param.id,
            list=param.list,
            delay=param.delay,
            auto=param.auto,
            direct=param.direct;
          this.dom = jQuery("#" + id);
          this.list = list;
          this.$scope = param;//传地址过来方便改变当前项current
          typeof delay === 'number' && (this.delay = delay * 1000);
          typeof auto === 'boolean' && (this.autoSlider = auto);
          if(typeof direct === 'string' && direct!=="upDown"){
            this.direct = 'leftRight';
            this.sliderData={
              distance:this.width,
              sliderParam:"margin-left",
              nextDirect:"right",
              prevDirect:"left"
            }
          }else{
            this.direct="upDown";
            this.sliderData={
              distance:this.height,
              sliderParam:"margin-top",
              nextDirect:"up",
              prevDirect:"down"
            }
          }
          this.reset();
          this.autoSlider && this.start();
        }
      };
    }])
    /*
     * 组建页码item list
     * 样式：
     * 总数11以内
     * 1 2 3 4 5 6 7 8 9 10 11
     * 总数11以后，当前数为7
     * <- 1 2 ... 5 6 7 8 9 ... 99 100 ->
     */
    .factory("createItems", function () {
      return function (currentPage,total) {
        var i = 0,
          items = [],
          c = +currentPage,
          l_c=c,
          r_c=c,
          t = +total,
        getItem=function (name) {
          return {
            name: name,
            click: typeof(name)==="number"?"num":"dot"
          }
        };
        //============总数少于9个全组上，返回
        if(t<9){
          for(i=1;i<=t;i++){
            items.push(getItem(i))
          }
          return items;
        }

        //============总数多于9个组建页码
        items.push(getItem(c));
        //====前面数字
        if(c-6>0){
          //多于6个，直接组1 2 ... c-2 c-1
          items.splice(0, 0,getItem(1),getItem(2),getItem("..."),getItem(c-2),getItem(c-1));
          l_c=c-2;
        }else{
          //少于6个，1-c全组上
          for (i = c-1; i > 0; i--) {
            items.splice(0,0,getItem(i));
          }
        }
        //=====后面数字

        if(c+6>t){
          if(t-c<2){
            //当c为最后1或2时，保证c附近有4个页码数字
            for(i=c-t;i>-2;i--){
              items.splice(3,0,getItem(--l_c));
            }

          }
          //全组上后面数字页码
          for (i = c+1; i <= t; i++) {
            items.push(getItem(i));
          }
        }else{
          //先组上后2个
          items.push(getItem(c+1),getItem(c+2));
          // 当c=1和2，以下保证c附近有4个页码数字
          r_c=c+2;
          if(c-2<=0){
            for(i=c-2;i<=0;i++){
              items.push(getItem(++r_c));
            }
          }
          if(r_c+4>t){
            for (i = r_c+1; i <= t; i++) {
              items.push(getItem(i));
            }
          }else{
            items.push(getItem("..."),getItem(t-1),getItem(t));
          }
        }

        return items;
      };
    })


});