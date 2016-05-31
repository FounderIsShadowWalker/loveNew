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

require(['N','Post','domEvent_homePage'],function(N,Post,domEvent_homePage){

    console.log(Post);
    console.log(domEvent_homePage);
    Post.prototype.setFunction(domEvent_homePage);
})


