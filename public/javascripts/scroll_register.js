define(['N','domEvent_register'],function(N,domEvent_register){

    "use strict";

    var arr = [],
        ds = $$.selector('div','section'),
        nav = $$.selector('div','nav')[0],
        tumblr_logo = $$.selector('div', 'innerCircle')[0],
        canvas = document.querySelector('canvas'),
        context = canvas.getContext('2d'),
        ns = $$.getParentByTag(nav,'div'), len = ns.length,
        form_container = $$.selector('div','form_container')[0],
        blogs_post_column = $$.selector('div','blogs-post-column'),
        post_container = $$.selector('div','moveUp'),
        create_graphic = $$.selector('div','create-graphic')[0],
        text_icon = $$.selector('div','text-icon'),
        form_container_last = $$.selector('div','form_container_last')[0];

    //绑定页面上的登陆button，对于scroll.js 和 domEvent.js 联系的方法全部放在闭包里

    console.log(domEvent_register);

    domEvent_register.loginButton();

    var clearCanvas = function () {
        context.clearRect(0,0,canvas.width,canvas.height);
    }

    var drawCanvas = function(callback){

        var CENTER_RADIUS = 10,
            EDGE_LENGTH = 100,
            CENTER_X = context.canvas.width/ 2,
            CENTER_Y = context.canvas.height/2;

        context.strokeStyle ='rgb(204,204,204)';
        context.lineWidth = '1';

        //画六边形
        //A 点坐标

        var timer;
        var points = [];
        var A = {
            x: (CENTER_X - EDGE_LENGTH / 2),
            y: (CENTER_Y - EDGE_LENGTH * Math.sqrt(3)/2)
        }

        var B ={
            x: (CENTER_X + EDGE_LENGTH / 2),
            y: (CENTER_Y - EDGE_LENGTH * Math.sqrt(3)/2)
        }

        var C = {
            x: CENTER_X + EDGE_LENGTH,
            y: CENTER_Y
        }

        var D = {
            x: (CENTER_X + EDGE_LENGTH / 2),
            y: (CENTER_Y + EDGE_LENGTH * Math.sqrt(3)/2)
        }

        var E = {
            x: (CENTER_X - EDGE_LENGTH / 2),
            y: (CENTER_Y + EDGE_LENGTH * Math.sqrt(3)/2)

        }

        var F = {
            x: CENTER_X - EDGE_LENGTH,
            y: CENTER_Y
        }

        points.push(A); points.push(B);  points.push(C); points.push(D);  points.push(E); points.push(F);

        resetBackGround(CENTER_X,CENTER_Y);

        function resetBackGround(x,y1,y2,y3,y4,y5,y6) {

            context.clearRect(0,0,canvas.width,canvas.height);
            context.strokeStyle ='rgb(204,204,204)';
            context.shadowBlur = 0;
            context.beginPath();
            for (var i = 0; i < points.length - 1; i++) {

                context.moveTo(points[i].x, points[i].y);
                context.lineTo(points[i + 1].x, points[i + 1].y);
                context.stroke();
            }

            context.moveTo(points[points.length - 1].x, points[points.length - 1].y);
            context.lineTo(points[0].x, points[0].y);
            context.stroke();


            var opacity = 1 - (x - A.x)/(CENTER_X - A.x) / 2;
            context.fillStyle = 'rgba(244,182,198, ' + opacity + ')';

            context.shadowColor = "red";
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 5;

            //画圆
            context.beginPath();
            context.arc(x, y1, CENTER_RADIUS, 0, 2 * Math.PI);   //1
            context.stroke();
            context.fill();
            context.beginPath();
            context.arc(x, y2, CENTER_RADIUS, 0, 2 * Math.PI);    //5
            context.stroke();
            context.fill();
            context.beginPath();
            context.arc(CENTER_X + (x - CENTER_X) * 2, y3, CENTER_RADIUS, 0, 2 * Math.PI);    //6
            context.stroke();
            context.fill();
            context.closePath();
            context.beginPath();

            context.beginPath();
            context.arc(CENTER_X - (x - CENTER_X), y4, CENTER_RADIUS, 0, 2 * Math.PI);    //2

            context.stroke();
            context.fill();
            context.beginPath();

            context.beginPath();
            context.arc(CENTER_X - (x - CENTER_X), y6, CENTER_RADIUS, 0, 2 * Math.PI);   //4
            context.stroke();
            context.fill();
            context.beginPath();
            context.arc(CENTER_X - (x - CENTER_X) * 2 , y5, CENTER_RADIUS, 0, 2 * Math.PI);   //3
            context.stroke();
            context.fill();
        }

        function calculateCircle(x,x2,x3,x4){
            var y1 = F.y - Math.sqrt(EDGE_LENGTH * EDGE_LENGTH - (x - F.x) * (x - F.x));   //1
            var y2 = D.y - Math.sqrt(EDGE_LENGTH * EDGE_LENGTH - (x - D.x) * (x - D.x)) ;      //5
            var y3 = E.y - Math.sqrt(EDGE_LENGTH * EDGE_LENGTH - (x2 - E.x) * (x2 - E.x));       //6
            var y4 = Math.sqrt(EDGE_LENGTH * EDGE_LENGTH - (x3 - A.x) * (x3 - A.x)) +  A.y ;   //2
            var y5 =  Math.sqrt(EDGE_LENGTH * EDGE_LENGTH - (x4 - B.x) * (x4 - B.x)) + B.y  ;    //3
            var y6 =  Math.sqrt(EDGE_LENGTH * EDGE_LENGTH - (x3 - C.x) * (x3 - C.x)) + C.y                                                                     //4
            return [y1,y2,y3,y4,y5,y6];
        }
        function moveCircle(){
            var i = 1;
            timer = setInterval(function(){
                var startX = CENTER_X - i;
                var startX2 = CENTER_X - 2 * i;
                var startX3 = CENTER_X + i;
                var startX4 = CENTER_X + 2 * i;
                var startY = calculateCircle(startX,startX2,startX3,startX4);

                resetBackGround(startX,startY[0],startY[1],startY[2],startY[3],startY[4],startY[5]);
                //resetBackGround(startX3,startY);
                if(startX <= A.x)  clearInterval(timer) && (timer = null);    //1,5
                if(startX == A.x)  callback && callback();

                i++;
            },15)
        }
        moveCircle();
    }
    return {
        "resetButtonIndex": function(num){
            for(var i=0; i<len; i++) {
                ns[i].className = "dot";
            }
            ns[num].className +=" active";
        },
        "Tumblr_start_0": function(){
            form_container.removeAttribute('style');
            $$.removeClass(form_container, "loginAnimaition");
            domEvent_register.loginButtonReset && domEvent_register.loginButtonReset();
            domEvent_register.lButton && (domEvent_register.lButton.style.color = "#56bc8a",domEvent_register.lButton.style.background = "#fff");

        },
        "Tumblr_start_1": function(){
            tumblr_logo.removeAttribute('style');
            clearCanvas();
        },
        "Tumblr_start_2": function () {
            for(var i=0,len=blogs_post_column.length; i<len; i++){
                blogs_post_column[i].removeAttribute('style');
            }
        },
        "Tumblr_start_3": function(){
            for(var i=0,len=post_container.length; i<len; i++) {
                post_container[i].removeAttribute('style');
            }

        },
        "Tumblr_start_4": function(){
            var text_icon = $$.selector('div','text-icon');
            create_graphic.timer && (clearInterval(create_graphic.timer), create_graphic.timer = null);
            for(var i=0,len=text_icon.length; i<len; i++) {
                text_icon[i].removeAttribute('style');
            }

        },
        "Tumblr_start_5": function(){
            domEvent_register.loginButtonReset &&domEvent_register.loginButtonReset();
            domEvent_register.lButton && (domEvent_register.lButton.style.color = "#56bc8a",domEvent_register.lButton.style.background = "#fff");
            form_container_last.removeAttribute('style');
        },

        //上滑
        "Tumblr_end_0": function(){
            this.resetButtonIndex(0);
            form_container.className += " loginAnimaition";

            domEvent_register.loginButtonHide && domEvent_register.loginButtonHide();
            domEvent_register.lButton && (domEvent_register.lButton.removeAttribute('style'));
            form_container.addEventListener('webkitAnimationEnd', function () {
                form_container.style.opacity = 1;
            });


        },
        "Tumblr_end_1": function(){
            this.resetButtonIndex(1);
            drawCanvas(function () {
                tumblr_logo.style.width = "80px";
                tumblr_logo.style.height = "80px";
            });
        },
        "Tumblr_end_2": function () {
            this.resetButtonIndex(2);
            for(var i=0,len=blogs_post_column.length; i<len; i++){
                blogs_post_column[i].style.opacity = "1";
                blogs_post_column[i].style.transform = "translateX(0px)";
            }
        },
        "Tumblr_end_3": function(){
            this.resetButtonIndex(3);
            for(var i=0,len=post_container.length; i<len; i++) {
                post_container[i].style.opacity = "1";
                post_container[i].style.transform = "translateY(0px)";
            }

        },
        "Tumblr_end_4": function() {
            this.resetButtonIndex(4);
            text_icon.forEach(function(item, index){
                create_graphic.timer = setTimeout(function(){
                    item.style.opacity = '1';
                    item.style.width = "100px";
                    item.style.height = "100px";
                },200 * index);
            });
        },
        "Tumblr_end_5": function() {
            this.resetButtonIndex(5);
            domEvent_register.loginButtonHide && domEvent_register.loginButtonHide();
            domEvent_register.lButton && (domEvent_register.lButton.removeAttribute('style'));
            form_container_last.style.opacity = '1';
            form_container_last.style.transform = "translateY(0px)";
        }
    }
})