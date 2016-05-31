var m;
$$.plug('magicWord', function(){
    var wordBoxes,
        frg = document.createDocumentFragment(),
        wordBox = $$.selector('div','title')[0],
        profile = $$.selector('div','profile')[0];

       return {
        MoveUP:  function(str){
            $$.hoverEnter(wordBox, function () {
                var words = str.split('');
                //create word box
                for(var i= 0, len=words.length; i<len; i++){
                    var word = document.createElement('span');
                    word.innerHTML = words[i];
                    frg.appendChild(word);
                }
                wordBox.innerHTML = "";
                wordBox.appendChild(frg);

                wordBoxes = $$.getParentByTag(wordBox,'span');
                Array.prototype.slice.call(wordBoxes, 0).forEach(function (item, index) {
                    index += 1;
                    setTimeout(function () {
                        item.style.transform = 'scaleY(1.5) translate3d(-30px, -50px, 0)';
                        item.addEventListener('webkitTransitionEnd', function () {
                            item.style.transform = 'scaleY(1) translate3d(0, 0, 0)';
                            //如果到了最后一个文字，在变换完成之后替换纯文本
                            if (index === wordBoxes.length - 1) {
                                item.addEventListener('webkitTransitionEnd', function (){
                                    wordBox.innerHTML = '<span>' + str + '</span>';
                                }, false);
                            }
                        }, false);
                    }, index * 100);
                })
            },function(){
            })
            return this;
        },
     profile: function(){
       $$.hoverEnter(profile, function(){
           //this.style.transform = 'translate3d(20px, 5px,10px)';                //scaleX,Y 缩放 rotate 3d 旋转 tanslate 平移
               this.className += " animationRotate";
       },function(){
           this.style.transform = '';
           this.className = "profile";
       })
       return this;
     }
}
});

$$.plug('IconMove', function(){
    var leftNav = $$.selector('div','nav-previous-left')[0],
        iconLeft = $$.getParentByClass(leftNav,'icon')[0],
        rightNav = $$.selector('div','nav-previous-right')[0],
        iconRight = $$.getParentByClass(rightNav,'icon')[0];

        $$.hoverEnter(leftNav, function(){
            iconLeft.style.marginLeft = '-20' +'px';
        },function(){
            iconLeft.style.marginLeft = '-10' +'px';
        });

        $$.hoverEnter(rightNav, function(){
            iconRight.style.marginLeft = '-20' +'px';
        },function(){
            iconRight.style.marginLeft = '-30' +'px';
        });

    return this;
});

$$.plug('pageDown', function(){
    var s = true,
        count = 0,
        pageRound = $$.selector('div','pageRound')[0],
        ns = $$.getParentByTag(pageRound,'div'),
        box = $$.selector('div','box')[0],
        lasttime = 0;
    var moveDown = $$.selector('div','moveDown')[0];
        $$.addEvent(moveDown, 'click', function () {
           moveDown();
        })

    var moveDown = function(){
        if(s) {
            s = false;
            var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
            i = 0;
            count == 3 ? count = 3 : count++ ;
            m && clearInterval(m);
            resetColor();
            var m = setInterval(function () {
                i++;
                box.scrollTop += pageHeight/ 20;
                i === 20 ? (clearInterval(m), box.style.overflow = 'hidden', ns[count].style.backgroundColor = 'red',
                    ns[count].style.width = '15px', ns[count].style.height = '15px', ns[count].style.borderRadius = '20px',
                    ns[count].style.marginLeft = '-2px', s = true,box.scrollTop = count * pageHeight ) : "";
                i == 20 && count == 2 && $$.wordScroll();
            }, 20);
        }
    };
    var moveUp =  function(){
        if(s) {
            s = false;
            i = 0;
            var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;;
            count == 0 ? count = 0 : count-- ;
            m && clearInterval(m);
            resetColor();
            var m = setInterval(function () {
                i++;
                box.scrollTop -= (document.documentElement.clientHeight || document.body.clientHeight) / 20;
                i === 20 ? (clearInterval(m), box.style.overflow = 'hidden',ns[count].style.backgroundColor = 'red',ns[count].style.width = '15px', ns[count].style.height = '15px', ns[count].style.borderRadius = '20px',ns[count].style.marginLeft = '-2px',s = true,box.scrollTop = count * pageHeight ) : "";
                i == 20 && count == 2 && $$.wordScroll();
            }, 20);
        }
    };
    function resetColor(){
        for(var i=0; i<ns.length; i++){
            ns[i].style.backgroundColor = '#CCCCCC';
            ns[i].style.width = '10px';
            ns[i].style.height = '10px';
            ns[i].style.borderRadius = '10px';
            ns[i].style.marginLeft = '0px';
        }
    }
    document.body.onmousewheel = function(){
        return false;
    }
    function mousewheel(e){
        e =e || window.event;
        //向下滚为false,反之为true
        var fx = e.wheelDelta > 0 ? e.wheelDelta > 10 : e.detail < 0;
        //!fx ? moveDown() : moveUp();
        var startTime = new Date().getTime();
        var interval = startTime - (lasttime = (lasttime === 0 ? 0 : lasttime));

        if(interval > 500 && !fx) {
            box.style.overflowY = 'scroll';
            moveDown();

        }
        if(interval > 500 && fx){
            box.style.overflowY = 'scroll';
            console.log("向下滑了");
            moveUp();
        }
        lasttime = startTime;
    }
    box.onmousewheel = mousewheel;
    return this;
});

$$.plug('banner', function(num){
    var loc = [
            {
                text: '新手入门',         //2012.4.14                      第一条居中显示 position 300
                timePosition : 300,    //假设某一个月的差距为 10            一页放5年 也就是 600
                top: '70px'
            },
            {
                text: '痴迷算法',      // 2012.10.16
                timePosition: 360,     // position
                top: '120px'
            },
            {
                text:'我钟爱的英语',    //2012.12.22
                timePosition: 380,
                top: '20px'
            },
            {
                text:'第一次称赞',    //2013.3.30
                timePosition: 410,
                top: '170px'
            },
            {
                text:'第一个域名',    //2013.5.4
                timePosition: 450,
                top: '120px'
            },
            {
                text:'备战考研',     //2013.9.17
                timePosition: 490,
                top: '60px'
            },
            {
                text:'第一个App',     //2014.3.13
                timePosition: 570,
                top: '85px'
            },
            {
                text:'今天',     //2015.3.23
                timePosition: 650,
                top: '110px'
            },
            {
                text:'渴望一份爱情',     //2016.2.2
                timePosition: 750,
                top: '120px'
            },
            {
                text:'技术大牛',     //2017.3.23
                timePosition: 860,
                top: '120px'
            },
            {
                text:'有一个team ',     //2018.5.23
                timePosition: 950,                      //最后一列加300
                top: '120px'
            }
        ],
        pageWidth = document.documentElement.clientWidth || document.body.clientWidth,
        textLength = $$.selector('div','text')[0].offsetWidth,
        texts = $$.selector('div','text'),
        box = $$.selector('div','boxes')[0],
        leftNav = $$.selector('div','nav-previous-left')[0],
        iconLeft = $$.getParentByClass(leftNav,'icon')[0],
        rightNav = $$.selector('div','nav-previous-right')[0],
        iconRight = $$.getParentByClass(rightNav,'icon')[0],
        timeLine = $$.selector('div','timeLine')[0],
        timeLineContent = $$.selector('div','timeLine-content')[0],
        pillars = $$.selector('div','pillar'),
        dream_process = $$.selector('div','dream_process'),
        timenavline = $$.selector('div','timenav-line')[0],
        timepillar = $$.selector('div','timepillar')[0],
        timelineDate = $$.selector('div','timeline-content-date')[num],
        timelineDateYear = $$.getParentByClass(timelineDate,'timeline-content-year')[0],
        timeLineDateMonth = $$.getParentByClass(timelineDate,'timeline-content-month')[0],
        timeLineDateDay = $$.getParentByClass(timelineDate,'timeline-content-day')[0],
        moveFlag = false,
        moveoverFlag = false,
        lastPosition,
        lastPositionMarginLeft,
        MarginInterval = 0,
        allMarginInterval = 0,
        timeLineWidth = 2 * pageWidth,
        now = num,                                          //保存今天
        s = true;

    //重置今天的
    console.log(timelineDateYear);
    console.log(timeLineDateMonth);
    var date = new Date();
    timeLineDateDay.innerHTML = date.getDate();
    console.log(date.getDate());
    console.log(date.getMonth() + 1);
    console.log(date.getYear());
    //重置昨天 今天 明天 text的bgimage
    function setTextColor() {
        for (var i = 0; i < dream_process.length; i++) {
            if (i < now) {
                dream_process[i].style.background = 'url(images/dream_success.png) no-repeat';
            }
            else {
                dream_process[i].style.background = 'url(images/dream_process.png) no-repeat';
            }
        }
        if (num < now) {
            dream_process[num].style.background = 'url(images/dream_success_hover.png) no-repeat';
        }
        else {
            dream_process[num].style.background = 'url(images/dream_process_hover.png) no-repeat';
        }
    }
    //设置昨天 今天 明天hover的颜色
    function setTextHover() {
        for (var i = 0; i < dream_process.length; i++) {
            if (i < now) {
                $$.hoverEnter(dream_process[i], function () {
                    this.style.background = 'url(images/dream_success_hover.png) no-repeat';
                }, function () {
                    this.style.background = 'url(images/dream_success.png) no-repeat';
                })
            }
            else {
                $$.hoverEnter(dream_process[i], function () {
                    this.style.background = 'url(images/dream_process_hover.png) no-repeat';
                }, function () {
                    this.style.background = 'url(images/dream_process.png) no-repeat';
                })
            }
        }
        $$.hoverEnter(dream_process[num], function () {}, function () {})
    }

    setTextColor();
    setTextHover();
    // 移动text到指定位置
    num && (box.style.marginLeft = num * (-textLength) + 'px');

    //设置timeLineContent 的宽度
    timeLineContent.style.width = timeLineWidth + 'px';

    //设置每一根时间轴的百分比与位置
    for(var i=0; i<pillars.length; i++){
        pillars[i].style.left = timeLineWidth * loc[i].timePosition/(loc[0].timePosition + loc[pillars.length-1].timePosition) + 'px';
        dream_process[i].style.left = timeLineWidth * loc[i].timePosition/(loc[0].timePosition + loc[pillars.length-1].timePosition) + 'px';
        dream_process[i].style.top = loc[i].top;
    };

    //移动textLine到指定位置
    num && (timeLineContent.style.marginLeft = -(dream_process[num].offsetLeft - dream_process[0].offsetLeft) + 'px');
    //移动三角形
    num && (timenavline.style.left = timeLineWidth * loc[num].timePosition/(loc[0].timePosition + loc[pillars.length-1].timePosition) + 'px');
    //移动三角形下的中柱
    num && (timepillar.style.left = timeLineWidth * loc[num].timePosition/(loc[0].timePosition + loc[pillars.length-1].timePosition) + 'px');

    function setZindex(){
        for(var i=0; i<texts.length; i++){
            texts[i].style.visibility  = 'hidden';
        }
        texts[num].style.visibility = 'visible';
    }

    function setPillarBackground(){
        for(var i=0; i<pillars.length; i++){
            pillars[i].style.backgroundColor = '#CCCCCC';
        }
        pillars[num].style.backgroundColor = '#00B4FF';
    }

    //重置width，防止box被拉长,间隙增大 && 重置text的length ->>100%
    box.style.width = textLength * texts.length + 'px';

    setZindex();

    for(var i=0; i<texts.length; i++){
        texts[i].style.width = textLength + 'px';
    }

    function moveRight(i){
        if(s){
            s = false;
            num += i;
            setZindex();
            if(num < (texts.length)) {
                setPillarBackground();
                //marginInterval 是由于拖拽导致timeLineContent 发生改变,而dream_process[num] 距离边界的长度不变,导致相对宽度变化,故进行重置
                 var tempo = parseInt($$.css(timeLineContent,'marginLeft')) + dream_process[num].offsetLeft - dream_process[0].offsetLeft - allMarginInterval;
                allMarginInterval = 0;


                //triangle move
                $$.buffer(timenavline,{left: timepillar.offsetLeft + tempo},function(){
                },30);

                //line move
                $$.buffer(timepillar,{left: timepillar.offsetLeft + tempo},function(){
                },30);

                //timeline move
                $$.buffer(timeLineContent,{marginLeft:  -(dream_process[num].offsetLeft - dream_process[0].offsetLeft)},function(){
                    setTextColor();
                    setTextHover();
                },30);

                //text move
                $$.buffer(box, {marginLeft: num * (-textLength)}, function () {
                    s = true;
                    num == texts.length - 1 ? iconRight.style.display = 'none' : iconLeft.style.display = 'block';
                }, 20);
            }
        }
    }

    function moveLeft(i){
        if(s){
            s = false;
            num -= i;
            setZindex();
            if(num >=  0) {
                setPillarBackground();
                var tempo = parseInt($$.css(timeLineContent,'marginLeft')) + dream_process[num].offsetLeft - dream_process[0].offsetLeft - allMarginInterval;
                //清除移动带来的margin 差
                allMarginInterval = 0;

                $$.buffer(timenavline,{left:  timepillar.offsetLeft + tempo},function(){
                },30);
                $$.buffer(timepillar,{left: timepillar.offsetLeft + tempo},function(){
                },30);
                $$.buffer(timeLineContent,{marginLeft:  -(dream_process[num].offsetLeft - dream_process[0].offsetLeft)},function(){
                    setTextColor();
                    setTextHover();
                },30);
                $$.buffer(box, {marginLeft: num * (-textLength)}, function () {
                    s = true;
                    num == 0 ? iconLeft.style.display = 'none' : iconRight.style.display = 'block';
                }, 20);
            }
        }
    }
    $$.addEvent(iconRight, 'click', function(){
         moveRight(1);
    });

    $$.addEvent(iconLeft, 'click', function(){
        moveLeft(1)
    });

    //给text绑定onclick
    for(var i=0; i<dream_process.length; i++) {
        $$.addEvent(dream_process[i], 'click', function(){
           var interval =  parseInt(this.getAttribute('data') - num);
           interval > 0 ? moveRight(interval) : moveLeft(Math.abs(interval));
        });
    }

    //给timeLine 加上拖动事件
    timeLine.onmousedown = function(e){
        lastPosition = e.clientX;
        lastPositionMarginLeft =  parseInt($$.css(timeLineContent,'marginLeft'));
        moveFlag = true;
        moveoverFlag = false;

    }
    timeLine.onmousemove = function(e){
        if(moveFlag){
            moveoverFlag = true;
            MarginInterval = e.clientX - lastPosition;
            timeLineContent.style.marginLeft = lastPositionMarginLeft +  MarginInterval + 'px';
        }
    }
    timeLine.onmouseup = function(){
        moveFlag = false;
        if(moveoverFlag) {
            allMarginInterval += MarginInterval;
        }
    }
    return this;
});

$$.plug('wordScroll', function(){
    var animationUl = $$.selector('div','animationUl')[0],
        len = $$.getParentByTag(animationUl,'li').length,
        ul = $$.getParentByTag(animationUl,'ul')[0],
        count = 1;
        ul.style.top = '0px';
        m && clearInterval(m);
        m = setInterval(function(){
        if(count < len) {
           ul.style.top = parseInt(ul.style.top) - 70 + 'px';
        }
        else{
            count = 0;
            ul.style.top = '0px';
        }
        count++;
    },1000);
   return this;
})

$$.plug('wordInterest', function(){
    var interestTagTitle = $$.selector('div','interestTagTitle'),
        interestTag = $$.selector('a','interestTag');

    for(var i=0; i< interestTag.length; i++){
        (function(i) {
            $$.hoverEnter(interestTag[i], function () {
                interestTagTitle[i].style.height = "97px";
                interestTagTitle[i].style.marginTop = "-20px";
            }, function() {
                interestTagTitle[i].style.height = "130px";
                interestTagTitle[i].style.marginTop = "0px";
            });
        })(i);
    }
    return this;
});

$$.$(function(){
    console.log('width:' + window.screen.width);
    console.log('height:' + window.screen.height);
    $$.banner(7).wordInterest().IconMove().pageDown().magicWord().MoveUP("ShadowWalker").profile();

})