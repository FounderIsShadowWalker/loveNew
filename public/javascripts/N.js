(function(win,doc){
    var MY = function(){
        var FOUNDER = function(){
            return FOUNDER.anbo;
        }
        var move = {
            linear: function(t,b,c,d) {
                return c * t / d + b;
            },
            circ: {
                ei: function(t,b,c,d){
                    return -c * (Math.sqrt(1 - ( t /= d ) * t ) - 1) + b;
                },
                eo: function(t,b,c,d){
                    return c * Math.sqrt(1 - (t = t / d - 1 ) * t) + b;
                },
                eio: function(t,b,c,d){
                    if (( t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                    return c / 2 * (Math.sqrt(1 - (t -= 2)*  t) + 1) + b;
                }
            },
            elastic: {
                ei: function(t,b,c,d,a,p){
                    if (t == 0) return b;  if (( t /=d ) == 1) return b + c;  if (!p) p = d * .3;
                    if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                    else var s = p / (2 * Math.PI) * Math.asin(c / a);
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                },
                eo: function(t,b,c,d,a,p){
                    if (t == 0) return b;  if ((t /= d) == 1) return b + c;  if (!p) p = d * .3;
                    if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                    else var s = p / (2*  Math.PI) * Math.asin(c / a);
                    return (a * Math.pow(2,-10 * t) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) + c + b);
                },
                eio: function(t,b,c,d,a,p){
                    if (t == 0) return b;  if (( t /= d / 2) == 2) return b + c;  if (!p) p = d * (.3 * 1.5);
                    if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
                    else var s = p / (2 * Math.PI) * Math.asin(c / a);
                    if (t < 1) return -.5 * (a * Math.pow(2,10 * (t -= 1)) * Math.sin( (t * d - s) * (2 * Math.PI)/p )) + b;
                    return a * Math.pow(2,-10 * (t -= 1)) * Math.sin( (t * d - s) * (2 * Math.PI)/p ) * .5 + c + b;
                }
            },
            back: {
                ei: function(t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    return c * (t /= d) * t * ((s + 1) * t - s) + b;
                },
                eo: function(t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                },
                eio: function(t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                }
            },
            bounce: {
                ei: function(t,b,c,d){
                    return c - move.bounce.eo(d - t, 0, c, d) + b;
                },
                eo: function(t,b,c,d){
                    if ((t /= d) < (1 / 2.75)) {
                        return c * (7.5625 * t * t) + b;
                    } else if (t < (2/2.75)) {
                        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                    } else if (t < (2.5/2.75)) {
                        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                    } else {
                        return c * (7.5625 * (t -= (2.625/2.75)) * t + .984375) + b;
                    }
                },
                eio: function(t,b,c,d){
                    if (t < d / 2) {
                        return move.bounce.ei(t * 2, 0, c, d) * .5 + b;
                    } else {
                        return move.bounce.eo(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                    }
                }
            }
        }
        FOUNDER.anbo = FOUNDER.prototype = {
            //还原构造器
            constructor: FOUNDER,
            $: function(f){
                this.addEvent(win,'load',f);
            },
            trim: function(str){
                return str.replace(/(^\s*)|(\s*$)/g,"");
            },
            //绑定事件
            addEvent: function(dom,type,fn){
                if(dom.addEventListener){
                    dom.addEventListener(type,fn,false);
                }
                else{
                    dom.attachEvent('on'+type,function(){
                        fn.call(dom);
                    });
                }
            },
            //获取class\id\自定义属性元素
            selector: function(eleName,getN,getValue){
                eleName = eleName || '*';
                var eles = doc.getElementsByTagName(eleName), result = [], len = eles.length;
                if(arguments.length == 1){
                    for(var i=0; i<len; i++){
                        result.push(eles[i]);
                    }
                }
                if(arguments.length === 2){
                    var idele = null;
                    getN.charAt(0) == '#' && (idele = doc.getElementById(getN.substring(1)));
                    idele && (idele.tagName.toLowerCase() === eleName && (result[0] = idele));
                    var reg = new RegExp('\\b' + getN + '\\b','g');
                    for(var i=0; i<len; i++){
                        eles[i].className.match(reg) && result.push(eles[i]);
                    }
                }
                if(arguments.length === 3){
                    for(var i=0; i<len; i++){
                        eles[i].getAttribute(getN) === getValue && result.push(eles[i]);
                    }
                }
                return result;
            },
            //检测浏览器版本与具体版本号
            browser: function(){
                var ua = win.navigator.userAgent.toLowerCase();
                return {
                    name: {
                        ie: /msie/.test(ua) && doc.all ? true : false,   //doc.all 获取页面所有标签 IE特有
                        safari: /safari/.test(ua) && !/chrome/.test(ua),
                        opera: /opera/.test(ua),
                        chrome: /chrome/.test(ua),
                        firefox: /firefox/.test(ua)
                    },
                    //browser
                    version: {
                        ver: null,
                        ie: (this.ver = ua.match(/msie\s*[\d.]+/)) && this.ver[0],
                        opera: (this.ver = ua.match(/opera\/[\d.]+/)) && this.ver[0],
                        chrome: (this.ver = ua.match(/chrome\/[\d.]+/)) && this.ver[0],
                        safari: (this.ver = ua.match(/safari\/[\d.]+/)) && this.ver[0],
                        firefox: (this.ver = ua.match(/firefox\/[\d.]+/)) && this.ver[0]
                    }
                }
            },

            /**
             *
             * @param ele  删除css类的元素
             * @param para  删除的类名 -->单类(String) 多类(数组表示)
             */
            removeClass: function(ele, para){
                if (typeof  para === "object" && para.length) {

                    for(var i=0; i<para.length; i++){
                        var temp,re;
                        if(ele.className) {
                            temp = ele.className;
                            re = new RegExp(para[i])
                            ele.className = temp.replace(re, "").trim();
                        }
                    }
                }

                else if (typeof  para === "string")
                {
                    var temp,re;
                    if(ele.className) {
                        temp = ele.className;
                        para = para.trim();
                        re = new RegExp(para);
                        ele.className = temp.replace(re, "").trim();
                    }

                }
                else{
                    alert("传入数据非法");
                }
            },
            //获取给定元素下的class元素
            getParentByClass: function(par,classN){
                par = par || doc;
                var eles = par.getElementsByTagName('*'), result = [], len =eles.length,
                    reg = new RegExp('\\b' + classN + '\\b','g');
                for(var i=0; i<len; i++){
                    eles[i].className.match(reg) && result.push(eles[i]);
                }
                return result;
            },
            getParentByTag: function(par,tag){
                par = par || doc;
                var eles = par.getElementsByTagName('*'), result = [], len =eles.length;
                for(var i=0; i<len; i++){
                    eles[i].tagName.toLowerCase() === tag && result.push(eles[i]);
                }
                return result;
            },
            //鼠标单机切换  box function function function
            toggle: function (obj){
                var _arguments = arguments;
                (function(count){
                    obj.onclick = function(){
                        count >= _arguments.length && (count = 1);
                        _arguments[count ++ % _arguments.length].call(obj);
                    }
                })(1);
            },
            //设置或获取css
            css: function(obj, attr, value){
                if(arguments.length === 2){
                    return attr === 'opacity' ? Math.round(parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]) * 100) :
                        obj.currentStyle ? obj.currentStyle[attr] :  document.defaultView.getComputedStyle(obj, false)[attr];
                }
                if(arguments.length === 3){
                    obj.style[attr] = value;
                }
            },
            //常用运动方式
            buffer: function(obj, targets, callback, times){
                if(obj.timer) obj.clearInterval(obj.timer)
                (!times || times > 30)  && (times = 30);
                times < 5 && (times = 5);
                if(typeof targets !== 'object') {
                    alert('argument error');
                    return;
                }
                var _this = this;
                obj.timer = setInterval(function(){
                    var speed = 0, pro = 0, stops = true;
                    for(var attr in targets) {
                        pro = parseInt(_this.css(obj, attr));
                        if(String(targets[attr]).indexOf('%') != -1){
                            targets[attr] = ''+ parseInt(parseInt(targets[attr]) / 100 * pro);
                        }else{
                            targets[attr] = targets[attr];
                        }


                        speed = (targets[attr] - pro) / 10;
                        speed  = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        (pro != targets[attr]) && (stops = false);
                        attr == 'opacity' ? (obj.style.opacity = (pro + speed) / 100, obj.style.filter = 'alpha(opacity:' + (pro + speed) + ')') : obj.style[attr] = pro + speed + 'px';
                    }
                    stops && (clearInterval(obj.timer), obj.timer = null, callback && callback(obj));
                },times);
            },
            //加速运动
            /**
             *
             * @param obj  运动实体
             * @param targets 运动属性
             * @param callback  回调函数
             * @param times  总时间/ms
             */
            acclerate: function(obj, targets, callback, times){
                var num = 0, interval = {}, a = {};
                !times && (times = 1000);
                times = times / 10;                       //设置成10ms 定位
                var _this = this;
                if(obj.timer) obj.clearInterval(obj.timer);
                for(var attr in targets) {
                    var pro = parseInt(_this.css(obj, attr));
                    if (String(targets[attr]).indexOf('%') != -1) {
                        targets[attr] = '' + parseInt(parseInt(targets[attr]) / 100 * pro);
                    } else {
                        targets[attr] = targets[attr];
                    }
                    interval[attr] = targets[attr] - pro;
                    a[attr] = 2 * (interval[attr])/(times * times);     //加速度 px/10ms
                }
                obj.timer = setInterval(function(){
                    for(var attr in interval){
                          obj.style[attr] =  0.5 * a[attr] * (num) * (num) + 'px';
                          num ++;
                        if(num == times) clearInterval(obj.timer) && (obj.timer = null) && (obj.style[attr] = target + 'px');
                    }
                },10);
            },
            //弹性运动
            flex: function(obj, attr, target, callback, times){
                var speed = 0, pro = 0, _this = this;
                if(obj.timer) obj.clearInterval(obj.timer)
                (!times || times > 30) && (times = 30);
                times < 5 && (times = 5);
                obj.timer = setInterval(function() {
                    pro = parseInt(_this.css(obj, attr));
                    speed += (target - pro) / 5;
                    speed *= 0.8;
                    Math.abs(speed) < 1 && Math.abs(target - pro) < 1 ? (clearInterval(obj.timer), obj.timer = null, obj.style[attr] = target + 'px', callback && callback()) : obj.style[attr] = pro + speed + 'px';
                },times);
            },
            //距离运动方式
            /*
             d要配合与步长(速率)一起使用  例如
             这里的步长初始化为 0.5
             参数 set:
             attr:变化属性 movetype:运动类型 mode:运动方式 tar:总距离(obj的最后状态) time:动画轴时间 rate:速率 process:回调时间
             */
            // anim(div,{attr:'width', tar: '1000', movetype:'bounce',mode:'eio'});
            anim: function(obj,set){
                set.rate = set.rate || .5;
                //t:开始时间 d:持续时间(帧速率) b:初值
                var t = 0, b = parseInt(this.css(obj, set.attr)), d = (set.tar - b) * set.rate;
                if(typeof set !== 'object'){
                    alert('参数错误');
                    return;
                }
                if(set.movetype == 'linear' && set.mode){
                    alert('线性运动没有运动模式');
                    return;
                }
                set.time < 5 && (set.time = 5);
                !set.time || set.time > 15 && (set.time = 15);
                switch (set.attr){
                    case 'top':
                    case 'left':
                    case 'right':
                    case 'bottom':
                    case 'width':
                    case 'height':
                    case 'marginLeft':
                    case 'marginRight':
                    case 'marginTop':
                    case 'marginBottom':
                        obj.timer && clearInterval(obj.timer);
                        obj.timer = setInterval(function(){
                            t < d ? t++ : t--;
                            obj.style[attr] = set.movetype !== 'linear' ? Math.ceil(move[set.movetype][set.mode](t,b,set.tar - b,d)) + 'px' : Math.ceil(move[set.movetype](t,b,set.tar - b,d)) + 'px';
                            t === d && (clearInterval(obj.timer), obj.style[set.attr] = set.tar + 'px', set.process && set.process());
                        },set.time);
                        break;
                    default :
                        alert('需要作用的属性不适合此运动');
                }
            },
            //鼠标淡入淡出  -->在 一个范围内move，都会调用
            hover: function(obj, fnOver, fnOut){
                fnOver && (obj.onmouseover = fnOver);
                fnOut && (obj.onmouseout = fnOut);
            },
            //鼠标淡入淡出  -->在 一个范围内enter,只会调用一次
            hoverEnter: function(obj,fnEnter, fnLeave){
                fnEnter && (obj.onmouseenter = fnEnter);
                fnLeave && (obj.onmouseleave = fnLeave);
            },
            //设置或获取元素属性值
            attr: function(obj, attr, value){
                switch (arguments.length){
                    case 1:
                        alert('参数错误');
                        break;
                    case 2:
                        return obj.getAttribute(attr);
                        break;
                    case 3:
                        obj.setAttribute(attr,value);
                        break;
                    default :
                        break;
                }
            },

            //获取指定下标的元素
            ada: function(eleList, index){
                var eleLen = eleList.length;
                for(var i=0; i<eleLen; i++){
                    if(i === index - 1){
                        return eleLen[i];
                    }
                }
            },
            //获取第一个元素
            firstE: function(eleList){
                return eleList[0];
            },
            //获取最后一个元素
            lastE: function(eleList){
                return eleList[eleList.length - 1];
            },
            //获得给定元素下的直接指定 class 的子元素
            findImm: function(par, child){
                par = par || doc.body;
                var eles = par.children, len = eles.length, result = [];
                for(var i=0; i<len; i++){
                    eles[i].tagName.toLowerCase() === child || eles[i].className === child && result.push(eles[i]);
                }
                return result;
            },
            trim: function(str){
                return str.replace(/^\s+|\s+$/g,'');
            },
            //检测一个元素的的父元素是否是给定的元素(可检测父元素的class或标签名)
            isParent: function(obj, par){
                return obj.parentNode.tagName.toLowerCase() === par || obj.parentNode.className === par ? true : false;
            },
            //检测一个元素是否包含指定的class
            isClass: function(obj, classN){
                var reg = new RegExp('\\b' + classN + '\\b');
                return obj.className.match(reg) ? true : false;
            },
            //检测一个元素是否有给定的属性  //0 不存在 －1 存在且非空 1存在且空
            isAttr: function(obj, attr){
                attr == 'className' && (attr = 'class');
                return !obj.getAttribute(attr) ? 0 : (obj.getAttribute(attr).match(/^\s+$/g) ? -1 : 1);
            },
            //检测一个元素的内容是否包含有给定的内容
            isContent: function(obj, inner){
                var reg = new RegExp(inner, 'g');
                return reg.test(obj.innerHTML) ? true : false;
            },
            //检测空对象
            isEmpty: function(obj){
                for(var attr in obj){
                    return false;
                }
                return true;
            },
            //数组转换哈希表
            arrReplaceToHash: function(arr, sub){
                if(!(arr instanceof Array && sub instanceof Array)){
                    alert('arguments error!');
                    return;
                }
                var hash = '{';
                for(var i=0; i< arr.length; i++){
                    hash += '"' + sub[i] + '":' + arr[i] + ',';
                }
                hash += '}';
                return eval('(' + hash.replace(hash.substr(hash.length -2),'{') + ')');
            },
            Html2dom: function(para){
                var shell = document.createElement('div');
                shell.innerHTML = para;
                return shell.childNodes[0];
            },
            //url 取参
            url : {
                QueryString: function(paramName){
                    var reg = new RegExp("[\?&]" + paramName + "=([^&]*)[&]?", "i");
                    var paramVal = window.location.search.match(reg);
                    return paramVal == null ? "" : paramVal[1];
                }
            },
            //ajax
            request: function(type, url, callback, val){
                var str = '',
                    xhr = win.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                if(type === 'post'){
                    if(typeof val !== 'object'){
                        alert('请以json格式传入val');
                        return;
                    }else{
                        for(var key in val){
                            str += key + '=' + val[key] + '&';
                        }
                    }
                    console.log(str);
                    xhr.open(type, url, true);
                    xhr.onreadystatechange = processData;
                    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                    xhr.send(str);
                }
                if(type === 'get') {
                    xhr.open(type, url, true), xhr.onreadystatechange = processData && xhr.send(null);
                }
                function processData(){

                    xhr.readyState === 4 && xhr.status === 200 && callback && callback(xhr.responseText);

                }
            },
            //接口方法
            plug: function(){
                for(var name in FOUNDER.prototype){
                    if(arguments[0] === name){
                        alert('参数已存在');
                        return;
                    }
                }
                FOUNDER.prototype[arguments[0]] = arguments[1];
            }
        }
        return FOUNDER.anbo;
    }();

    win.$$ = win.S = MY;
})(window,document);
