$$.plug('CodeContent', function(){
    var location = [],
        imgs = [],
        num = 0,
        boom = $$.selector('input','boom')[0],
        upperImg = $$.selector('div','questionContainer'),
        bg = $$.selector('div','bg')[0],
        box = $$.selector('div','box')[0],
        circle = $$.selector('span','circle'),
        tip = $$.selector('div','tipsPlay')[0],
        tipConfirm = $$.selector('button','confirm')[0],
        canvas = $$.selector('canvas')[0],
        ctx = canvas.getContext('2d'),
        setTimemove;
     return {
         boom: function(){
           var that = this;
           $$.addEvent(boom, 'click', function () {
               var bg = $$.selector('div','bg')[0],
                   blocks = $$.getParentByClass(bg,'bg-block');
                   setTimemove && clearTimeout(setTimemove) && console.log("我清掉了定时器");
                   //点按button 将图片浮上来
                   bg.style.zIndex = 1;

               for(var i=0, len=blocks.length; i<len; i++){
                   blocks[i].style.transition = 'all .8s ease-in-out';
               }

                   blocks[0].style.opacity = 0;
                   blocks[0].style.transform = 'scale(1.5) rotateY(100deg) rotateZ(90deg) translateX(-100px) translateY(-100px) '  ;

                   blocks[1].style.opacity = 0;
                   blocks[1].style.transform = 'scale(1.5) rotateY(90deg) rotateZ(60deg) translate3d(0, -180px, -170px)';
                    blocks[1].style.webkitTransform =  'scale(1.5) rotateY(90deg) rotateZ(60deg) translate3d(0, -180px, -170px)';

                   blocks[2].style.opacity = 0;
                   blocks[2].style.transform = 'scale(1.5) rotateY(70deg) rotateY(80deg) translate3d(0, -150px, -160px)';

                   blocks[3].style.opacity = 0;
                   blocks[3].style.transform = 'scale(1.5) rotateY(100deg) rotateZ(90deg) translate3d(-100px, -100px, -50px)';

                   blocks[4].style.opacity = 0;
                   blocks[4].style.transform = 'scale(1.5) rotateY(40deg) rotateZ(80deg) translate3d(-190px, -100px, 30px)';

                   blocks[5].style.opacity = 0;
                   blocks[5].style.transform = 'scale(1.5) rotateY(50deg) rotateZ(50deg) translate3d(0, -80px, 300px)';

                   blocks[6].style.opacity = 0;
                   blocks[6].style.transform = 'scale(1.5) rotateY(60deg) rotateZ(80deg) translate3d(0, 100px, -100px)';

                   blocks[7].style.opacity = 0;
                   blocks[7].style.transform = 'scale(1.5) rotateY(40deg) rotateZ(70deg) translate3d(0, 70px, -80px)';

                   blocks[8].style.opacity = 0;
                   blocks[8].style.transform = 'scale(1.5) rotateY(80deg) rotateZ(55deg) translate3d(0, 20px, -50px)';

                   blocks[9].style.opacity = 0;
                   blocks[9].style.transform = 'scale(1.5) rotateY(80deg) rotateZ(20deg) translate3d(0, 90px, 100px)';

                   blocks[10].style.opacity = 0;
                   blocks[10].style.transform = 'scale(1.5) rotateY(50deg) rotateZ(60deg) translate3d(0, 70px, 350px)';

                   blocks[11].style.opacity = 0;
                   blocks[11].style.transform = 'scale(1.5) rotateY(70deg) rotateZ(80deg) translate3d(0, 20px, 520px)';
               setTimemove = setTimeout(function(){
                   bg.style.zIndex = -1;
                   for(var i=0; i<len; i++){
                       blocks[i].removeAttribute('style');
                       blocks[i].style.transition = 'none';
                   }
                   // 动画结束后
                   num++;
                   if(num < upperImg.length) {
                       $$.CodeContent().cut(null, num);
                   }
                   else{
                       that.addFlexTip(tip);
                   }
               },800);
           })
             return this;
         },
         circleHoverAndClick: function () {
            for(var i=0; i<circle.length; i++){
                $$.addEvent(circle[i],'click',function(){
                    if(this.style.backgroundColor != 'rgb(0, 183, 255)') {
                        this.style.backgroundColor = 'rgb(0, 183, 255)';
                    }
                    else{
                        this.style.backgroundColor = '#CCCCCC';
                    }
                })
            }
            return this;
         },
         cut: function (fn,num) {
             // show specify question
             for(var i=0;i < upperImg.length;i++) {
                 upperImg[i].style.display = 'none';
             }
             upperImg[num].style.display = 'block';
             var outCome = this.html(upperImg[num].innerHTML);
             if(outCome){
                 var AllDiv = $$.getParentByTag(box,'div'),
                     lastDiv = $$.lastE(AllDiv),
                     upperDiv = $$.selector('div','bg')[0],
                     blocks = $$.getParentByClass(upperDiv,'bg-block');
                         var data = '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="360">' +
                             '<?xml-stylesheet  href="../svg.css" type="text/css" ?>' +
                             '<foreignObject width="100%" height="100%">' +
                             '<div xmlns="http://www.w3.org/1999/xhtml" style="position: absolute;left:50%;top: 50%;width: 720px;height: 360px;margin: -180px 0 0 -360px;perspective: 600px;font-size: 20px;">' +
                              outCome +
                             '</div>' +
                             '</foreignObject>' +
                             '</svg>';
                         var DOMURL = window.URL || window.webkitURL || window;
                         var img = new Image();
                         var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
                         var url = DOMURL.createObjectURL(svg);

                         lastDiv.parentNode.removeChild(lastDiv);
                         img.onload = function () {
                             ctx.drawImage(img, 0, 0);
                             for(var i=0; i<blocks.length; i++) {
                                 blocks[i].style.backgroundImage = 'url(' + img.src + ')';
                             }
                             imgs.push(img);
                             var image = new Image();
                             image= canvas.toDataURL("image/png");
                             DOMURL.revokeObjectURL(url);
                         }
                         img.src = url;
             }
             this[fn] && this[fn]();
             return this;
         },
         getStyleSheet: function(url) {
             var sheet = [];
             for (var i = 0; i < document.styleSheets.length; i++) {
                 if(url){
                 //if (url && document.styleSheets[i].href.indexOf(url) != -1) {
                         sheet.push(document.styleSheets[i]);
                 }
             }
             return sheet;
         },
         getCssClass: function(selector,url,name,type){
            var styleSheet = this.getStyleSheet(url);
             var rules = styleSheet[0].cssRules || styleSheet[0].rules;
            //MISE 会把标签转换成大写
            switch (type) {
                case "class":
                    var allClass = "";
                    var perClass = selector.className.split(/\s+/);
                    for(var i=0;i<perClass.length;i++) {
                        for (var j = 0; j < rules.length; j++) {
                            if (rules[j].selectorText === "." + perClass[i]) {
                                var tempo = rules[j].cssText.replace("." + perClass[i], "").replace("{", "").replace("}", "");
                                allClass = allClass + tempo;
                            }
                        }
                    }
                    selector.removeAttribute('class');
                    selector.style.cssText = allClass;
                    if(selector.tagName.toLowerCase() === 'span'){
                        selector.className = 'bg-block';
                    }
                    break;
            }
         },
         html: function(data){
            var tempoDiv = document.createElement('div'),
                that = this;
            tempoDiv.className = 'bg';
            this.selector = tempoDiv;
            tempoDiv.innerHTML = data;
            box.appendChild(tempoDiv);
            this.walkTheDOMRecursive(function(node) {
                that.getCssClass(node,"css/question.css",node.className,"class");
            },tempoDiv,0,function(){
                that.outCome = tempoDiv.innerHTML;

            });
             return that.outCome;
        },
        myInnerHtml: function(selector){
            var temp = document.createElement('div');
            temp.innerHTML = '';
            temp.appendChild(selector.cloneNode(true));
            return temp.innerHTML;
        },
        addFlexTip: function(obj){
            var top = parseInt((document.documentElement.clientHeight || document.body.clientHeight) - obj.clientHeight)/2;
            $$.flex(obj,'top',top,'',10);

        },
        tipClick: function(){
            $$.addEvent(tipConfirm,'click',function(){
                $$.buffer(box,{opacity: 0},'',10);
                $$.buffer(tip,{opacity: 0},'',20);
            })
            return this;
        },
        walkTheDOMRecursive: function(func,node,depth,callback){
            var root = node || window.document;
            func.call(root,root);
            var node = root.firstChild;
            while(node){
                if(node.nodeType === 1) {
                    depth++;
                    this.walkTheDOMRecursive(func, node, depth);
                }
                if(node.nodeType === 1)
                    depth--;

                node = node.nextSibling;
            }
            if(depth === 0){
                callback();
            }
        },
        camlize: function(s){
            return s.replace(/-(\w)/g,function(strMatch,p1){
                return p1.toUpperCase();
            })
        },
        outCome:null,
        selector:null
     }
});
$$.$(function(){
    //boom 是回调函数名
    !$$.browser().name.chrome && alert('尊敬的用户你好,检测到你使用的是非chrome浏览器,可能效果不佳,请更换浏览器');
    $$.browser().name.chrome && $$.CodeContent().tipClick().circleHoverAndClick().cut('boom',0);   //重第一页开始翻
})
