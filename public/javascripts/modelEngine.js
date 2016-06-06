/**
 * name: 模版引擎
 * author: shadow Walker
 * github: FounderIsShadowWalker
 * qq: 1528021521@qq.com
 * date: 2016/6/1
 */

define([], function(){
//var para = {
//    span: {
//        div:{
//            span: [
//                {
//                   id: "span1",
//                   content: "span1"
//                },
//                {
//                   id: "span2",
//                   content: "span2"
//                },
//                {
//                   id: "span3",
//                   content: "span3"
//                }],
//            div: {
//                img:[
//                      {
//                         id: "我就是个img",
//                         content:"img"
//                      }
//                ],
//                outer: {
//                    id: "第三层的div",
//                    content: "div"
//                }
//            },
//            p:[{
//                id: "我就是个p",
//                content: "p"
//            }],
//            outer: {
//                id: "第二层的div",
//                content: "div"
//            }},
//        span: [{
//            id: "span0",
//            content: "span0"
//        }],
//        outer: {
//            id: "第一层的div",
//            content: "div"
//        }
//    },
//    outer: null
//}

var contentHtml = "";
var outterTag = "";
function genereateEngine(para,outter,outterTag,pureHtml){

      for(var i in para){
         if(Object.prototype.toString.call(para[i]) === "[object Object]"){

            outterTag = i;
            if(i === "outer"){
                return pureHtml;
            }

            var unitHtml = genereateEngine(para[i],i,outterTag, "");
            var attr = " ";
             for(var j in para[i].outer){
                 if(j !== "content") {
                     attr += j + "='"+ para[i].outer[j] + "' ";
                 }
             }
             attr = attr.substr(0, attr.length - 1);

            unitHtml =   '<' + outterTag + attr+'>' + unitHtml + para[i].outer.content + '</' + outterTag + '>';
            contentHtml = pureHtml + unitHtml;
            pureHtml = pureHtml + unitHtml;
         }
         else if(Object.prototype.toString.call(para[i]) === "[object Array]"){
             var tempoHtml = newUnitModel(i,para[i]);
             pureHtml += tempoHtml;
         }
         else if(para[i] === null){
             console.log("解析完成");
             //console.log(contentHtml);
             return contentHtml;
         }
         else{
             console.log(i);
             console.log("传入的数据非法，解析失败");
         }
      }
}

    // 返回一类元素
    function newUnitModel(tag, content){
        var sameCatalog = "";

        for(var i=0; i<content.length; i++) {
            var attr = " ";

            for(var j in content[i]){
                if(j !== "content") {
                    attr += j + "='"+ content[i][j] + "' ";
                }
            }
            attr = attr.substr(0, attr.length - 1);
            sameCatalog += ("<" + tag + attr + ">" + content[i].content + "</" + tag + ">");
        }
        return sameCatalog;
    }

    return {
        genereateEngine: genereateEngine
    }
});


//var result = genereateEngine(para,"","","");
//console.log(result)

