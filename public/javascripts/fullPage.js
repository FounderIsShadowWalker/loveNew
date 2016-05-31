define(function(){
    "use strict";

    var container = document.querySelector(".innerContainer"),
        sections = document.querySelectorAll(".section"),
        pageHeight = sections[0].offsetHeight,
        len = sections.length, s = true, i = 0;

    /*
     *  nextFun 往下翻页先行函数
     *  prevFun 上滑翻页先行函数
     */
   return function(scroll) {

       function next() {
           if (s) {
               console.log("下滑:" + i);
               typeof  scroll === "object" &&  scroll["Tumblr_start_" + i] && scroll["Tumblr_start_" + i]();
               i++;
               i == len && (i = len - 1);
               s = false;
               //等待半秒页面上的元素消失
               setTimeout(function(){
                   $$.buffer(container, {top: -i * pageHeight}, function () {
                       //滑动完成的动画展示
                        typeof  scroll === "object" &&  scroll["Tumblr_end_" + i] && scroll["Tumblr_end_" + i]();
                       //保证展示1s的动画
                       setTimeout(function () {
                           s = true;
                       }, 1000);
                   }, 20);
               },500);
           }
       }

       function prev() {
           if (s) {
               console.log("上滑:" + i);
               typeof  scroll === "object" &&  scroll["Tumblr_start_" + i] && scroll["Tumblr_start_" + i]();
               i--;
               i < 0 && (i = 0);
               s = false;

               $$.buffer(container, {top: -i * pageHeight}, function () {
                   typeof  scroll === "object" &&  scroll["Tumblr_end_" + i] && scroll["Tumblr_end_" + i]();
                   setTimeout(function () {
                       s = true;
                   }, 1000);
               }, 20);
           }
       }

       function mousewheel(e) {
           e = e || window.event;
           //向下滚为false,反之为true
           var fx = e.wheelDelta > 0 ? e.wheelDelta > 0 : e.detail < 0;
           !fx ? next() : prev();
       }

       document.body.onmousewheel = function () {
           return false;
       }
       $$.addEvent(container, 'mousewheel', mousewheel);
       $$.addEvent(container, 'DOMMouseScroll', mousewheel);

       return {
           top: function(){
               i = 0;
               $$.buffer(container, {top: 0}, function () {
                   typeof  scroll === "object" &&  scroll["Tumblr_end_0"] && scroll["Tumblr_end_0"]();
                   setTimeout(function () {
                       s = true;
                   }, 1000);
               }, 20);
           }
       }
   }
});