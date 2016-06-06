window.onload = function(){
    var iScrollIndicator = $$.selector("div","iScrollIndicator")[0];
    var allWidth = $$.selector("div","iScrollHorizontalScrollbar")[0];
    var blog_wrapper = $$.selector("div","blog_wrapper")[0];
    //var modelNode = $$.selector("div","blog_model")[0];
    var search_row = $$.selector("div","search_row")[0];
    var left_icon = $$.selector("span","left_icon")[0];
    var right_icon = $$.selector("span","right_icon")[0];
    var blog_user_search = $$.selector("div","blog_user_search")[0];

    var hiddenSearch = $$.selector('div','#hiddenSearch')[0];
    var test = $$.selector("div","#test");
    var ol = $$.selector("ol","posts");
    var li = $$.selector("li","post_container")[0];
    var post_media_photo = $$.getParentByClass(li,"post_media_photo")[0];
    var post = $$.selector("div", "#search_posts")[0];

    var clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
    var blog_moveX;
    iScrollIndicator.style.width = allWidth.offsetWidth  * clientWidth /( blog_wrapper.offsetWidth) + "px";



    (function(para){
        var search_term_heading = $$.selector("h1", "search_term_heading")[0];
        var name = $$.selector("span", "name")[0];
        var info =  $$.selector("div", "info")[0];
        var infoMessage = $$.getParentByTag(info,"h1")[0];
        var button = $$.selector("button", "follow")[0];

        para = JSON.parse(para);
        name.innerHTML = para.content.email;
        infoMessage.innerHTML = para.content.username;
        search_term_heading.innerHTML = para.content.email;
        if(para.result === "0"){
            button.innerHTML = "已添加";
            button.style.background = "#ddd";
            button.style.opacity = "0.6";
            button.disabled = true;
        }
    }(hiddenSearch.innerHTML));


    var modelNode = $$.selector("div","blog_model")[0];
    var modelNodeHtml = outInnerHtml(modelNode.cloneNode(true));
    var tempoNode = Html2dom(modelNodeHtml);

    var modelLiHtml = outInnerHtml(li.cloneNode(true));
    var tempoLi = Html2dom(modelLiHtml);

    (function (para) {

        var nodeItem = 7;

        for(var i=0;i<nodeItem;i++){
            var new_node = tempoNode.cloneNode(true);
            search_row.appendChild(new_node);
        }

        blog_wrapper.style.width = 320 * (1 + nodeItem)  + 20 + "px";

    }(hiddenSearch.innerHTML));

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

    function showMore(){
        iScrollIndicator.showMore && clearTimeout(iScrollIndicator.showMore) && (iScrollIndicator.showMore = null);

        iScrollIndicator.showMore = setTimeout(function () {
            for (var i = 0; i < 4; i++) {
                var new_node = tempoNode.cloneNode(true);
                search_row.appendChild(new_node);
            }

            blog_wrapper.style.width = blog_wrapper.offsetWidth + 320 * 4 + "px";
            iScrollIndicator.style.width = allWidth.offsetWidth * clientWidth / ( blog_wrapper.offsetWidth) + "px";

            //重置滑动条的位置
            iScrollIndicator.style.left = iScrollIndicator.offsetWidth * (blog_moveX / allWidth.offsetWidth) + "px";

        }, 1000);
    }

    search_row.addEventListener('click',function(e){
        var e = e || window.event,
            tar = e.target || e.srcElement;

        if(tar.tagName.toLocaleLowerCase() === "button" && tar.className === "follow"){
            var tempo = tar.parentNode;

            while(true){
                if(tempo.nodeType == 1 && tempo.className === "name" && tempo.tagName.toLocaleLowerCase() === "span"){
                  break;
                }
                tempo = tempo.previousSibling;
            };

            tar.innerHTML = "Waiting";
            tar.style.background = "#ddd";
            tar.style.opacity = "0.6";
            $$.request("post","/Tumblr_search", function(para){
                if(para === "success"){
                    tar.innerHTML = "已添加";
                    tar.disabled = "true";
                }
            },{email: tempo.innerHTML, user: window.localStorage.getItem('userMail')})
        }

    },false);

    $$.hoverEnter(blog_user_search, function(){
        allWidth.style.opacity = "1";
    }, function(){
        allWidth.style.opacity = "0";
    })
    iScrollIndicator.onmousedown = function(e){
        var lastPosition = e.clientX;
        var moveFlag = true;
        var left = iScrollIndicator.offsetLeft;


        document.onmousemove = function(e){
            if(moveFlag){
                moveFlag = true;
                iScrollIndicator.style.left = left +  e.clientX - lastPosition + "px";

                if(iScrollIndicator.offsetLeft < 0){
                    iScrollIndicator.style.left = "0px";
                }

                if(iScrollIndicator.offsetLeft > allWidth.offsetWidth - iScrollIndicator.offsetWidth){
                    iScrollIndicator.style.left = allWidth.offsetWidth - iScrollIndicator.offsetWidth + "px";
                }


                var now_blog_wrapper_left = (blog_wrapper.offsetWidth) * iScrollIndicator.offsetLeft / allWidth.offsetWidth;
                blog_wrapper.style.transform = "translate(" + -1 * now_blog_wrapper_left + "px" + ", 0px)";
                blog_moveX = now_blog_wrapper_left;

                if(iScrollIndicator.offsetLeft ===  allWidth.offsetWidth - iScrollIndicator.offsetWidth) {
                    showMore();
                }
            }
        }
        this.onmouseup = document.onmouseup= function(e){
            moveFlag = false;
            document.onmousemove = null;
        }
    }

    window.addEventListener('scroll', function(){
        if(document.body.scrollTop + document.body.clientHeight >= document.body.scrollHeight){
            setTimeout(function() {

                var  k;

                for(k=0; k<3; k++) {

                    var j=0;
                    var min = ol[0].offsetHeight;

                    for (var i = 0; i < ol.length; i++) {
                        if (ol[i].offsetHeight < min) {
                            min = ol[i].offsetHeight;
                            j = i;
                        }
                    }
                    var new_node = tempoLi.cloneNode(true);
                    var a = $$.getParentByClass(new_node,"post_media_photo")[0];
                    a.style.height = Math.random() * 10 * 7 + post_media_photo.offsetHeight + "px";
                    ol[j].appendChild(new_node);
                }
            },2000);
        }
    });
    right_icon.onclick = function(){
        blog_moveX = blog_moveX || 0;
        var interval = 320 * 4  ;
        var i = 0;
        var destination;
        var time = 1000;      //ms
        time = time / 10;     //单位 10ms
        var a =  2 * interval/(time * time);     //加速度 px/10ms

        left_icon &&  clearInterval(left_icon.m) && (left_icon.m = null);
        right_icon.m && clearInterval(right_icon.m) && (right_icon.m = null);
        right_icon.m = setInterval(function(){
                i ++;
                destination = blog_moveX + 0.5 * a * (2 * i + 1);
                blog_wrapper.style.transform = "translate(" + -1 * destination + "px" + ", 0px)";
                blog_moveX = destination;

                console.log(blog_moveX);

                i === time && clearInterval(right_icon.m) && (right_icon.m = null);
                iScrollIndicator.style.left = iScrollIndicator.offsetWidth * (blog_moveX / allWidth.offsetWidth) + "px";

                if(iScrollIndicator.offsetLeft > allWidth.offsetWidth - iScrollIndicator.offsetWidth){
                    iScrollIndicator.style.left = allWidth.offsetWidth - iScrollIndicator.offsetWidth + "px";
                    clearInterval(right_icon.m) && (right_icon.m = null);
                }

                if(allWidth.offsetWidth - iScrollIndicator.offsetLeft  - iScrollIndicator.offsetWidth < 10){
                    showMore();
                }
            },
        10);
    }

    left_icon.onclick =  function(){
        blog_moveX = blog_moveX || 0;
        var interval = 320 * 4;
        var i = 0;
        var destination;
        var time = 1000;      //ms
        time = time / 10;     //单位 10ms
        var a =  2 * interval/(time * time);     //加速度 px/10ms
        left_icon &&  clearInterval(left_icon.m) && (left_icon.m = null);
        right_icon.m && clearInterval(right_icon.m) && (right_icon.m = null);
        left_icon.m = setInterval(function(){
                i ++;
                destination = blog_moveX -  0.5 * a * (2 * i + 1);
                destination < 0 && (destination = 0) && (clearInterval(left_icon.m) && (left_icon.m = null));
                blog_wrapper.style.transform = "translate(" + -1 * destination + "px" + ", 0px)";
                blog_moveX = destination;
                i === time && clearInterval(left_icon.m) && (left_icon.m = null);
                iScrollIndicator.style.left = iScrollIndicator.offsetWidth * (blog_moveX / allWidth.offsetWidth) + "px";
            },
            10);
    }
}