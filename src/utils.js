define(['app','angular'], function (app,angular) {
  'use strict';

  app
    .constant("MENUS",{
      "main":{id:0,name:"main",title: "首页", url: "#/main",index:0},
      "findland":{id:1,name:"findland",title: "我要找地", url: "#/findland",index:1},
      "financial":{id:2,name:"financial",title: "金融服务", url: "#/financial",index:2},
      "agroService":{id:3,name:"agroService",title: "涉农服务", url: "#/agro-service",index:3},
      "news":{id:4,name:"news",title: "土地资讯", url: "#/news",index:4}
    })
    /*
    <a class="emn-level-1 msg-center-icon">消息中心</a>
    <a class="emn-level-1 land-source-icon">土地资源管理</a>
    <div class="emn-level-2-wrap fs-14"><!--最后一个需加 .pb-0-->
        <a class="emn-level-2 active">土地资源管理</a>
        <a class="emn-level-2">土地资源编辑</a>
        <a class="emn-level-2">查看土地资源</a>
    </div>
    <a class="emn-level-1 project-attract-icon">项目招商管理</a>
    <a class="emn-level-1 need-icon">需求管理</a>
    <a class="emn-level-1 acc-msg-icon">账户信息管理</a>
     */
    .constant("ENDMENUS",{
      "end.msgCenter":{id:0,name:"end.msgCenter",title: "消息中心", url: "#/msgCenter",index:0,kls:"msg-center-icon"},
      "end.mngLand":{id:1,title: "土地资源管理", index:1,kls:"land-source-icon"},
      "end.projectAttract":{id:2,name:"end.projectAttract",title: "项目招商管理", url: "#/projectAttract",index:2,kls:"project-attract-icon"},
      "end.needMng":{id:3,name:"end.needMng",title: "需求管理", url: "#/needMng",index:3,kls:"need-icon"},
      "end.accMsg":{id:4,name:"end.accMsg",title: "账户信息管理", url: "#/accMsg",index:4,kls:"acc-msg-icon"},

      "end.manageLand":{id:5,name:"end.manageLand",title: "土地资源管理", url: "#/manageLand",index:0,pid:1},
      "end.editLand":{id:6,name:"end.editLand",title: "土地资源编辑", url: "#/editLand",index:1,pid:1},
      "end.addLand":{id:7,name:"end.addLand",title: "新增土地资源", url: "#/addLand",index:2,pid:1}
    })

    .factory("publicVal", ["MENUS","ENDMENUS",function (MENUS,ENDMENUS) {
      var val={
        serverTel: "020-87595266"
      };

      val.menus=(function () {
        var ary=[];
        angular.forEach(MENUS,function(value, key){
          ary[value.index]=value;
        });
        return ary;
      })();

      val.endMenus=(function () {
        var ary=[];
        angular.forEach(ENDMENUS,function(value, key){
          if(value.pid!==undefined){
            if(ary[value.pid]===undefined) ary[value.pid]={};
            if(ary[value.pid]["children"]===undefined) ary[value.pid]["children"]=[];
            ary[value.pid]["children"][value.index]=value;
          }else{
            if(ary[value.index]!==undefined){
              angular.extend(ary[value.index],value);
            }else{
              ary[value.index]=value;
            }
          }
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

      //可流转方式
      val.dealModeId= [
        {id:'1',name:'转让'},
        {id:'2',name:'出租'},
        {id:'3',name:'转包'},
        {id:'4',name:'入股'},
        {id:'5',name:'互换'},
        {id:'6',name:'其他'}
      ];

      //流转价格单位
      val.dealUnitId=[
        {id:'1',name:'元/亩/年',type:"13"},
        {id:'2',name:'元/平米/月',type:"12"},
        {id:'3',name:'万元/年',type:"123"},
        {id:'4',name:'万元',type:"1"}
      ];

      //地上设施
      val.facility=[
        {id:1,name:"水井"},
        {id:2,name:"大棚"},
        {id:3,name:"仓库"},
        {id:4,name:"农机房"},
        {id:5,name:"晾晒场"},
        {id:6,name:"育种育苗场"},
        {id:7,name:"生活生产用房"}
      ];

      //地上设施
      val.服务配套=[
        {id:1,name:"物流"},
        {id:2,name:"仓储"},
        {id:3,name:"批发市场"},
        {id:4,name:"超市"},
        {id:5,name:"农科站"}
      ];

      //权属类型
      val.ownershipType=[
        {id:'1',name:'集体'},
        {id:'2',name:'个人'},
        {id:'3',name:'国有'}
      ];

      //水源条件
      val.water=[
        {id:'1',name:'水源充足'},
        {id:'2',name:'水源稀缺'}
      ];

      //是否通路
      val.ifAccessId=[
        {id:'1',name:'已通路'},
        {id:'2',name:'未通路'}
      ];

      //网络条件
      val.networkId=[
        {id:'1',name:'已通网络'},
        {id:'2',name:'未通可通网络'},
        {id:'3',name:'未通网络'}
      ];

      //供水条件
      val.headWaters=[
        {id:'1',name:'已通水'},
        {id:'2',name:'未通可通水'},
        {id:'3',name:'未通水'}
      ];

      //供电条件
      val.powerSupplyId=[
        {id:'1',name:'已通电'},
        {id:'2',name:'未通可通电'},
        {id:'3',name:'未通电'}
      ];

      //平整程度
      val.smoothDegreeId=[
        {id:'1',name:'非常平整'},
        {id:'2',name:'程度一般'},
        {id:'3',name:'程度较差'}
      ];

      //土地面积
      val.acreageUnit=[
        {id:'亩',name:'亩'},
        {id:'平米',name:'平米'}
      ];

      //==========以下为angular run ajax中返回
      //适合经营
      val.managementTypesId=[
        //   {name:'粮食油料类',id:'1'},
        //   {name:'水果坚果类',id:'2'},
        //   {name:'养殖类',id:'3'},
        //   {name:'蔬菜瓜果类',id:'4'},
        //   {name:'林木类',id:'5'},
        //   {name:'商业住宅类',id:'6'},
        //   {name:'工矿仓储类',id:'7'},
        //   {name:'其他',id:'8'}
      ];

      //土地类型一级类型
      val.landType=[];

      //区域一级列表-省
      val.provinceArea=[];






      //=========服务器host配置
      val.frontHost="http://192.168.1.125:8080/";
      val.imgHost="http://192.168.1.84:8096/";
      val.severHost="http://192.168.1.84:8080/";
      val.loginHost="http://nonjiayi-auth.nongj.com/admin/toLogin";



      return val;
    }])

    .run(["publicVal","queryClassify",function (publicVal,queryClassify) {
      //适合经营
      queryClassify.getStair()
        .then(function (value) {
          publicVal.managementTypesId=value;
        },function (reason) {
          publicVal.managementTypesId=[];
        });

      //土地类型
      queryClassify.getLand()
        .then(function(result){
          publicVal.landType=result;
        },function (reason) {
          publicVal.landType=[];
        });

      //区域-省
      queryClassify.getArea()
        .then(function(result){
          publicVal.provinceArea=result;
        },function (reason) {
          publicVal.provinceArea=[];
        });
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

      function getDomain() {
        var domain=document.domain;
        var exg=/\.(com|net|org)(\.cn)?$/;
        var end,_front,lastDot;
        end=domain.match(exg);
        if(end){
          end=end[0];
          _front=domain.replace(end,"");
          lastDot=_front.lastIndexOf(".");
          if(lastDot!=-1){
            _front=_front.substr(lastDot+1);
          }
          domain=_front+end;
        }
        console.log(domain)
        return domain;
      }

      return {
        setCookie: setCookie,
        getCookie: getCookie,
        delCookie: delCookie,
        getDomain:getDomain
      };
    }])
    .factory("njwUrlUtil", function () {
      return {
        getFromURL: function (url, parameter) {
          var index;
          url=url||location.href;
          index= url.indexOf("?");
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
        //index 下一个轮播图下标
        slide: function (index) {
          var param={},that=this;
          this.cancelTimer();
          that.current=index;
          if(index<0){
            that.current=that.last;
          }else if(index>that.last){
            that.current=0;
          }
          that.$scope.current = that.current;
          param[that.sliderData.sliderParam]="-" + that.getMoveDis(index) + "px";
          that.dom.animate(param, that.speed, "linear", function () {
            that.autoSlider&&that.start();
            if(index!==that.current){
              that.dom.css(that.sliderData.sliderParam, "-" + that.getMoveDis() + "px");
            }
          });
        },
        getMoveDis:function (index) {
          if(index===undefined) index=this.current;
          return this.sliderData.distance*(index+1);
        },
        //直接轮播到图index
        moveTo:function (index) {
          this.slide(index);
        },
        //下一个
        next: function () {
          this.slide(this.current+1);
        },
        //上一个
        prev: function () {
          this.slide(this.current-1);
        },
        start: function () {
          var that = this;
          that.timer = $timeout(function () {
            that.next();
          }, that.delay);
        },
        clearAnimate:function () {
          //轮播动画中暂不进行处理
          this.isAnimated&&this.dom.stop();
        },
        cancelTimer: function () {
          $timeout.cancel(this.timer);
          this.clearAnimate();
        },
        reset: function () {
          this.size = this.list.length;
          this.last = this.size-1;
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
          this.dom = angular.element("#" + id);
          this.list = list;
          this.$scope = param;//传地址过来方便改变当前项current
          typeof delay === 'number' && (this.delay = delay * 1000);
          typeof auto === 'boolean' && (this.autoSlider = auto);
          if(typeof direct === 'string' && direct!=="upDown"){
            this.direct = 'leftRight';
            this.sliderData={
              distance:this.width,
              sliderParam:"margin-left"
            }
          }else{
            this.direct="upDown";
            this.sliderData={
              distance:this.height,
              sliderParam:"margin-top"
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