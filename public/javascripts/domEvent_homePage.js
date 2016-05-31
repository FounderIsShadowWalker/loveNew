define(['N','Post'],function(N,Post){
  var popover = $$.selector("div","#popover")[0],
      blog_container = $$.selector("div","blog_container")[0],
      right_column = $$.selector("div","right_column")[0],
      li_item = $$.getParentByClass(right_column,"item"),
      avatar_circle = $$.getParentByClass(popover,"avatar_circle")[0],
      recent_posts = $$.getParentByClass(popover,"recent_posts")[0],
      left_column = $$.selector("div","left_column")[0],
      post_ol =  $$.getParentByClass(left_column,'posts')[0],
      post_container = $$.getParentByClass(left_column,"post_container"),
      post_node = $$.getParentByClass(left_column,"post_container")[post_container.length - 1],
      load_container =  $$.selector("div","#load_container")[0],
      auto_pagination_loader = $$.selector("div","#auto_pagination_loader")[0],
      post_avators,
    //post_avators = $$.selector("div","post_avator"),
      iconContainer = $$.selector("div","iconContainer")[0],
      post_full = $$.selector("div","post_full")[0],
      //post_wrapper_container = $$.selector("div","post_wrapper_container"),
      post_wrapper_container,
      post_type = $$.selector('div','text'),
      upload_files = [],
      hiddenPost = $$.selector('div','#hiddenPost')[0],
      m;

      var post_nodeHTML = outInnerHtml(post_node);
      /**
       *  初始 post 的socket，email
       */

        var email = $$.url.QueryString("email");
        var postNew = new Post(email);
        postNew.init(post_nodeHTML);


        /*
            添加后台发送到前台的博文
         */
        (function(posts){
            var left_column = $$.selector("div","left_column")[0],
                post_ol = $$.getParentByClass(left_column,'posts')[0];

            var post_container = $$.getParentByClass(left_column,"post_container");
            posts = posts.replace(/&lt;/g,"<").replace(/&gt;/g,">");
            var posts = JSON.parse(posts);
            var post_node = Html2dom(post_nodeHTML);
            var contentInnerHTML = "";

            for(var i=0; i<posts.length; i++){
                var tempoNode = post_node.cloneNode(true);
                post_ol.insertBefore(tempoNode, post_container[1]);

                var post_container = $$.getParentByClass(left_column,"post_container");
                var post_content = $$.getParentByClass(post_container[1],"post_content")[0];
                post_content.style.textIndent = '20px';
                post_content.innerHTML = "";

                var contents = posts[i].content.split(",");
                contents.forEach(function(item, index){
                    if(!/<img src/.test(item)) {
                        contentInnerHTML += "<div>" + item + "</div>";
                    }
                    else{
                        var src = "avatar/" + item.match(/<img src=(.*?)\/>/i)[1];
                        contentInnerHTML += "<div style='overflow:hidden'>" + "<img height='210'" +
                            "style='width: auto;position: relative;display: block;margin: 0 auto;' src='"+ src +"'/>"
                            + "</div>"
                    }
                })
                var avator = $$.getParentByClass(tempoNode,"post_avator")[0];
                console.log(tempoNode);
                console.log(avator);
                //post_wrapper_container.unshift(tempoNode);
                //post_avators.unshift(avator);
                post_content.innerHTML = contentInnerHTML;
                contentInnerHTML = "";
            }
            post_wrapper_container = $$.selector("div","post_wrapper_container");
            post_avators = $$.selector("div","post_avator");
        }(hiddenPost.innerHTML));

      function outInnerHtml(ele){
          var shell = document.createElement('div');
          shell.appendChild(ele);
          return shell.innerHTML;
      }

      function Html2dom(para){
           var shell = document.createElement('div');
           shell.innerHTML = para;
           return shell.childNodes[0];
      }

      post_type[0].addEventListener("click", function(){
          post_full.style.height = "200px";
           setTimeout(function() {
               iconContainer.style.opacity = 0;
               iconContainer.style.display = 'none';
               var mask = document.createElement('div');
               mask.className = 'mask';

               mask.style.height = blog_container.offsetHeight + auto_pagination_loader.offsetHeight + 'px';
               document.body.appendChild(mask);

               var left = post_full.getBoundingClientRect().left,
                   top = post_full.getBoundingClientRect().top,
                   width = post_full.offsetWidth;


               var temp_post_full = post_full.cloneNode(true);
               temp_post_full.style.left = left + "px";
               temp_post_full.style.top = top + "px";
               temp_post_full.style.width = width + "px";
               temp_post_full.style.height = "auto";
               mask.appendChild(temp_post_full);

               var post_form_header = document.createElement('div');
               post_form_header.className = "post_form_header";
               var span = document.createElement('span');
               span.className = 'userid';
               span.innerHTML = "fang7693979";

               post_form_header.appendChild(span);
               temp_post_full.appendChild(post_form_header);

               var post_form_text = document.createElement('div');
               post_form_text.className = 'post_form_text';
               var title = document.createElement('input');
               title.setAttribute('type', 'text');
               title.setAttribute('placeholder', '标题');
               title.className = 'title';
               post_form_text.appendChild(title);
               var editor = document.createElement('div');
               editor.className = "editor";
               editor.setAttribute("contenteditable", "true");
               editor.innerHTML = "在这里填写文字";

               var tag = document.createElement('div');
               tag.className = "tag";
               tag.setAttribute("contenteditable", "true");
               tag.innerHTML = "#标签";

               temp_post_full.appendChild(post_form_text);
               temp_post_full.appendChild(editor);
               temp_post_full.appendChild(tag);

               var add_type_container = document.createElement('div');
               add_type_container.className = 'add_type_container';
               add_type_container.style.top = '88px';
               var add_type = document.createElement('div');
               add_type.className = "addType";
               add_type_container.appendChild(add_type);
               var add_type_content =  document.createElement('div');

               for(var i=0; i <5; i++){
                   var add_img = document.createElement('div');
                   add_img.className = "add_img";
                   add_img.style.backgroundImage = "url(images/Tumblr_add_post_img" + i + ".png)"
                   var input_file = document.createElement('input');
                   input_file.setAttribute('type', 'file');
                   input_file.value = "";
                   add_img.appendChild(input_file);
                   add_type_content.appendChild(add_img);
               }
               var input_files = $$.getParentByTag(add_type_content,'input');

               input_files[0].addEventListener('change',function(){
                   var file = this.files[0];
                   upload_files.push(file);
                   console.log(file.type);

                   if(!/image/g.test(file.type)) {
                       return alert('只能上传图片！');
                   }
                   if(!/jpg|jpeg|png/g.test(file.type)) {
                       return alert('不支持的图片类型！');
                   }
                   if(file.size > 1024 * 1024 * 10) {
                       return alert('图片超过限制大小了，最大上传10mb的图片！');
                   }

                   var reader = new FileReader();
                   var img = new Image();
                   reader.readAsDataURL(file);
                   reader.onload = function(e){
                       editor.innerHTML = editor.innerHTML.replace('在这里填写文字','');
                       add_type.style.transform = "";
                       add_type_content.style.width = "0px";
                       var div = document.createElement('div');
                       div.style.overflow = 'hidden';
                       img.src = e.target.result;
                       img.width = 210;
                       img.height = 210;
                       img.style.float ='left';
                       div.appendChild(img);
                       editor.appendChild(div);
                       var div = document.createElement('div');
                       div.innerHTML = "<br>";
                       editor.appendChild(div);
                       var temp =  div.previousSibling.previousSibling;
                       temp && temp.innerHTML === "<br>" &&  temp.parentNode.removeChild(temp) ;
                       add_type_container.style.top = add_type_container.offsetTop + 210  + 'px';
                       enter_count = (add_type_container.offsetTop - add_type_container_origin_top) / 21;
                   }
               },false);

               add_type_content.className = 'add_type_content';
               add_type_container.appendChild(add_type_content);
               temp_post_full.appendChild(add_type_container);


               add_type_container.addEventListener('click', function(){
                   if(add_type_content.offsetWidth === 0) {
                       add_type.style.transform = "rotate(135deg)";
                       add_type_content.style.width = "500px";
                   }
                   else{
                       add_type.style.transform = "";
                       add_type_content.style.width = "0px";
                   }

               },false);

               var add_type_container_origin_top = add_type_container.offsetTop,
                   enter_count = 0;

               editor.addEventListener('focus', function(){

                   add_type_content.style.width = "0px";
                   editor.innerHTML === "在这里填写文字" && (editor.innerHTML = "");

                   editor.onkeyup = function(e){
                       //console.log(editor.innerHTML);
                        if(e.keyCode === 13){
                            enter_count ++;
                            add_type_container.style.top = add_type_container_origin_top + enter_count * 21 + 'px';
                            add_type_container.style.opacity = "1";
                        }
                        else if(e.keyCode === 8){
                            var str = editor.innerHTML;
                            var isEmpty = editor.innerHTML.substr(0,15);
                            add_type_container.style.opacity = "0";
                            editor.lastChild && editor.lastChild.innerHTML.substr(0,4) ==="<br>" && (add_type_container.style.opacity = "1");
                            //console.log(isEmpty);
                            enter_count = str.split("<div").length - 1;
                            var img_count = str.split("<img").length - 1;
                            //console.log("div的数目:" + enter_count)
                            //console.log(editor.innerHTML);
                            //console.log("图片数目:" + img_count);
                            if(editor.innerHTML === ""){
                                add_type_container.style.opacity = "1";
                                enter_count >= 1 && enter_count --;
                                add_type_container.style.top = add_type_container_origin_top + enter_count * 21 + 'px';
                            }
                            //console.log("行数:" + enter_count);
                            //contenteditable 的第一行如果非空，会去除div标签，如果直接换行，会不上<div><br></div>
                            isEmpty === "<div><br></div>" && enter_count >= 1 && enter_count --;
                            //在第一行加图片的时候第一行不为空，会出现div
                            isEmpty === '<div style="ove' && enter_count >= 1 && enter_count --;
                            enter_count = enter_count + img_count * 9 ;
                            //console.log("按下退格后重置enter_count:" + enter_count);
                            add_type_container.style.top = add_type_container_origin_top + enter_count * 21 +'px';

                            //重置enter_count
                            enter_count = (add_type_container.offsetTop - add_type_container_origin_top) / 21;
                            //console.log(add_type_container.offsetTop);
                            //console.log(add_type_container_origin_top);
                            //console.log("按下退格后重置enter_count:" + enter_count);

                        }
                       else{
                            add_type_container.style.opacity = "0";
                        }
                   }

               },false);

               editor.addEventListener("blur", function () {
                   if (editor.innerHTML === "") {
                       editor.innerHTML = "在这里填写文字";
                       add_type.style.opacity = "1";
                   }
               }, false);


               tag.addEventListener("blur", function () {
                   if (tag.innerHTML === "") {
                       tag.innerHTML = "#标签";
                   }
               }, false);

               tag.addEventListener("focus", function () {
                       tag.innerHTML = "";
               }, false);

               var controls_container = document.createElement('div');
               controls_container.className = 'controls-container';
               var control_left = document.createElement('div');
               control_left.className = 'control_left';
               var close_button = document.createElement('button');
               close_button.className = 'closeButton';
               close_button.innerHTML = "关闭";
               control_left.appendChild(close_button);

               close_button.addEventListener('click', function () {
                   mask.parentNode.removeChild(mask);
                   post_full.style.height = "99px";
                   iconContainer.style.opacity = 1;
                   iconContainer.style.display = 'block';
               });

               var button = document.createElement('button');
               button.className = 'postButton';
               button.innerHTML = "发布";

               control_left.appendChild(button);

               //发布帖子
               button.addEventListener('click', function(){
                    var date = new Date();
                    var formData = new FormData();
                    var title = document.querySelector("div.post_form_text input[type='text']");
                    var footerTag = document.querySelector("div.post_full div.tag");
                    var postContent;
                    var timestamp = date.getFullYear() + "_" + Number(date.getMonth()+1) + "_" + date.getDate() + "_" +
                        date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();

                   /**
                    * getPostContent 获取postContent的html内容
                    */
                    function getPostContent(){
                        editor.lastChild.innerHTML === "<br>" && editor.lastChild.parentNode.removeChild(editor.lastChild);
                        return editor.innerHTML;
                    }

                    /**
                     *  getPostImgAndText 获取文字和图片
                     */
                    function getPostImgAndText(post_content){
                        var i=0;
                        var post = {};
                        var content = [];
                        result = post_content.replace(/<div.*?>/g, ",").replace(/<img.*?>/g,function(strMatch,p1){

                            var temp = "<img src=" + timestamp + "_" + upload_files[i].name + "/>";
                            i++;
                            return temp;

                        }).replace(/<\/div>/g,"");

                        result.charAt(0) === ',' && (result = result.substr(1, result.length));

                        var context = result.split(",");

                        for(var i=0; i<context.length; i++){
                                content.push(context[i]);
                        }

                        post.content = content;
                        return post;
                    }

                   /**
                    * dealPostContent 将文字和图片信息提取出来
                     */

                   function dealPostContent(){
                        var post_content = getPostContent();
                        var content = getPostImgAndText(post_content);
                        return content;
                    };

                   /**
                    *    整合上传内容 -->(用户名 帖子标签，帖子标注 内容 )
                    */
                    postContent = dealPostContent();
                    postContent.author = email;
                    postContent.title = title.value;
                    postContent.footTag = footerTag.innerHTML;
                    postContent = JSON.stringify(postContent);

                    formData.append('post', postContent);


                   (function(img) {
                       upload_files.forEach(function (item, index) {

                           var avatarName = timestamp + "_" + upload_files[index].name;

                           formData.append("file" + index, upload_files[index]);
                           img.push(avatarName);
                       });
                       formData.append("img", JSON.stringify(img));
                   })([]);


                    var http = new XMLHttpRequest();

                    http.open('post','/HomePage', true);

                    http.onload = function(){
                        editor.lastChild.innerHTML === "<br>" && editor.lastChild.parentNode.removeChild(editor.lastChild);
                        var post_article = editor.innerHTML;
                        var tempoNode = post_node.cloneNode(true);
                        post_container = $$.getParentByClass(left_column,"post_container"),
                        post_ol.insertBefore(tempoNode, post_container[1]);
                        post_container = $$.getParentByClass(left_column,"post_container");
                        var post_content = $$.getParentByClass(post_container[1],"post_content")[0];
                        post_content.style.textIndent = '20px';
                        post_content.innerHTML = post_article;
                        var img = $$.getParentByTag(post_content, "img");

                        //让img 宽度自适应 且居中
                        for(var i=0; i<img.length; i++) {
                           img[i].removeAttribute('width');
                           img[i].style.width = 'auto';
                           img[i].parentNode.style.paddingLeft = (img[i].parentNode.offsetWidth -  img[i].offsetWidth) / 2 + 'px';
                        }

                        mask.parentNode.removeChild(mask);
                        post_full.style.height = "99px";
                        iconContainer.style.opacity = 1;
                        iconContainer.style.display = 'block';
                        var avator = $$.getParentByClass(tempoNode,"post_avator")[0];

                        // 增加新插入的发布的博客板块 和 头像
                        post_wrapper_container.unshift(tempoNode);
                        post_avators.unshift(avator);
                        upload_files = [];

                        //通知其他好友,我发消息了  email 发送方的标签 content是内容
                        postNew.postNew(email,postContent);
                    }

                    http.send(formData);

               },false);

               controls_container.appendChild(control_left);
               temp_post_full.appendChild(controls_container);

           },300);
      },false);



      //去除第一个导航栏里的 post_avator
      post_avators.splice(0,1);

      function reset(){
        popover.removeAttribute('style');
        avatar_circle.removeAttribute('style');
        $$.removeClass(recent_posts, "moveDownUp");
      }


      window.addEventListener('scroll', function(){

        for(var i=0; i< post_wrapper_container.length; i++){

            if( post_wrapper_container[i].getBoundingClientRect().top > -250 &&  post_wrapper_container[i].getBoundingClientRect().top < 25){
                var video = $$.getParentByTag(post_wrapper_container[i], "video")[0];
                video && video.play();
            }
            else{
                var video = $$.getParentByTag(post_wrapper_container[i], "video")[0];
                video && video.pause();
            }

            //45是白底的高，加10px做为两个post_avatorde间距
            if(post_wrapper_container[i].getBoundingClientRect().top  > - (post_wrapper_container[i].offsetHeight - 55) &&  post_wrapper_container[i].getBoundingClientRect().top <=0)
                post_avators[i].style.top =  post_wrapper_container[i].offsetHeight -  post_wrapper_container[i].getBoundingClientRect().bottom  + "px";
        }

        if(document.body.scrollTop + document.body.clientHeight >= document.body.scrollHeight){

            setTimeout(function(){
                post_node = Html2dom(post_nodeHTML);
                //console.log(post_node);

              for(var i=0;i <4; i++) {
                var new_node = post_node.cloneNode(post_node,true);
                post_ol.appendChild(new_node);
              }

                post_avators = $$.selector("div","post_avator"),
                post_wrapper_container = $$.selector("div","post_wrapper_container");
                post_node = $$.getParentByClass(left_column,"post_container")[post_container.length - 1];
                post_avators.splice(0,1);

            },2000);

        }
      })

        for (var i = 0; i < li_item.length; i++) {

          (function(i){
            li_item[i].onmouseenter = function () {
              reset();
              m && clearInterval(m) && (m = null);
              m = setTimeout(function () {
                recent_posts.className += " moveDownUp";
                popover.style.opacity = 1;
                popover.style.zIndex = "1";
                avatar_circle.style.width = "64px";
                avatar_circle.style.height = "64px";
                popover.style.left = li_item[i].getBoundingClientRect().left + "px";
                popover.style.top = li_item[i].getBoundingClientRect().top + 20 + document.body.scrollTop + "px";
              }, 300);
            }
          })(i);
    }


     left_column.addEventListener('mouseenter', function(e){
       var e = e || window.event,
           tar = e.target || e.srcElement;

       if(tar.tagName.toLocaleLowerCase() === "div" && tar.className === "post_avator" ){
           reset();
           m && clearInterval(m) && (m = null);
           m = setTimeout(function(){
           recent_posts.className += " moveDownUp";
           popover.style.opacity = 1;
           popover.style.zIndex = "1";
           avatar_circle.style.width = "64px";
           avatar_circle.style.height = "64px";
           popover.style.left = tar.getBoundingClientRect().left  + "px";
           popover.style.top = tar.getBoundingClientRect().top +74 + document.body.scrollTop + "px";
         },300);

       }
     },true);

     left_column.addEventListener('click', function(e){
           var e = e || window.event,
               tar = e.target || e.srcElement;

           if(tar.tagName.toLocaleLowerCase() === "span" && tar.className === 'note_link_current'){
                load_container.style.display = "block";
                load_container.style.opacity = "1";
                load_container.style.top = tar.getBoundingClientRect().top + document.body.scrollTop  +  "px";
                load_container.style.left = tar.getBoundingClientRect().left - 10 + "px";
                setTimeout(function(){
                    var tempo = load_container.innerHTML;
                    load_container.innerHTML = "";
                    load_container.className = "popover-inner";
                    var header_container_inner = document.createElement('div');
                    header_container_inner.className = "header_container_inner";
                    var conversation = document.createElement('div');
                    var header_inner = document.createElement('div');
                    header_inner.className = "header-inner";
                    var p = document.createElement('p');
                    var textNode = document.createTextNode('330,331 热度');
                    p.className = "primary-message";
                    p.appendChild(textNode);
                    header_inner.appendChild(p);
                    conversation.appendChild(header_inner);
                    conversation.className = "conversation";
                    header_container_inner.appendChild(conversation);
                    load_container.appendChild(header_container_inner);
                    var commentAuthor = document.createElement('div');
                    commentAuthor.className = 'commentAuthor';
                    var frgs = document.createDocumentFragment();
                    for(var i=0; i<8; i++){
                        var a = document.createElement('a');
                        a.className = "post-activity-avatar-link";
                        frgs.appendChild(a);
                    }
                    var p = document.createElement('p');
                    var textNode = document.createTextNode('45,105 个喜欢 和 54,052 个转发');
                    p.appendChild(textNode);
                    p.className = "rollup-notes-summary";
                    commentAuthor.appendChild(frgs);
                    commentAuthor.appendChild(p);
                    header_container_inner.appendChild(commentAuthor);
                    var main_container = document.createElement('div');
                    main_container.className = "main-container";
                    main_container.style.height = load_container.offsetHeight -  header_container_inner.offsetHeight  - 3 + "px";
                    var tx_scroll = document.createElement('div');
                    tx_scroll.className = "tx-scroll";
                    main_container.appendChild(tx_scroll);
                    load_container.appendChild(main_container);


                    //写评论
                    var post_activity_note_content = document.createElement('div');
                    post_activity_note_content.className = 'post-activity-note-content';
                    var avator = document.createElement('div');
                    avator.className = "post-activity-note-avator";
                    var content = document.createElement('div');
                    content.className = 'post-activity-note-content';
                    var p = document.createElement('p');
                    p.className = 'note-text';
                    var textNode = document.createTextNode('greymom');
                    p.appendChild(textNode);
                    content.appendChild(p);
                    var p = document.createElement('div');
                    p.className = 'note-added-text';
                    var textNode = document.createTextNode('#look#i knew it#i SAW this coming#fucking#grey#grey this is me#this is 1000000% me#enya#enya you are amazing#bless this woman#bless her cats#bless her castle#tears#so many tears#queen after my own heart Grace are you ok?');
                    p.appendChild(textNode);
                    content.appendChild(p);

                    post_activity_note_content.appendChild(avator);
                    post_activity_note_content.appendChild(content);
                    tx_scroll.appendChild(post_activity_note_content);


                    load_container.addEventListener('mouseleave', function(){
                        load_container.style.display = "none";
                        load_container.style.opacity = "0";
                        load_container.className = "";
                        load_container.innerHTML = tempo;
                    })
                },1000);

           }

     },false);

     popover.addEventListener('mouseleave',function(){
       reset();
     })

   return function resetPostAvator (tempoNode, avator){
           // 增加新插入的发布的博客板块 和 头像
           post_wrapper_container.unshift(tempoNode);
           post_avators.unshift(avator);
       }
})