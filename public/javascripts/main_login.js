require.config({
        //baseUrl: "js/",

        paths: {
            "domReady" : "domReady",
            "fullPage" : "fullPage",
            "N": "N"
        }
        ,

        shim: {
            "fullPage":{
                deps: ['N'],
                exports: 'fullPage'
            }

        }
    }
)

//require 相当于主函数的main方法，进行调用  define相当于定义路径下的js文件方法
//require(['domReady!'],function (doc) {

require(['fullPage','scroll_login','domEvent_login'],function(fullPage,scroll_login,domEvent_login){
    //var A = "A"
    //fullPage(function(test){console.log("下滑了");console.log(test);console.log(A)}, function(){console.log("上滑了")});


    console.log("login 页面");


    var extendScroll = fullPage(scroll_login);


    domEvent_login.top = extendScroll.top;


    var firstPage = $$.selector('div','firstPage')[0],
        form_container = $$.selector('div','form_container')[0];

    firstPage.style.top = "-45px";

    //登陆框的简单动画
    form_container.className += " loginAnimaition";
    form_container.addEventListener('webkitAnimationEnd', function () {
        form_container.style.opacity = 1;
    });


})

//});

