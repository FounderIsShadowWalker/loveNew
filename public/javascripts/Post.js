define(['N'], function(){

    function Post(email){
        this.socket = null;
        this.email = email;
        this.postBuffer = [];
    }

    Post.prototype = {
        constructor: Post,
        init: function(postNode){
            //帖子样式原型
            this.post_node = $$.Html2dom(postNode);
            this.socket = io.connect('http://localhost:3000');
            this.socket.emit('login',this.email);
            var that = this;
            this.socket.on('getNew', function(email,content){
                // 好友发过来的帖子

                that.postBuffer.push(content);

                var tab_anchor = $$.selector("a","tab_anchor");
                tab_anchor[0].style.backgroundImage = "url(images/Tumblr_icon1_add.png)";


                tab_anchor[0].onclick = function(){
                    that.postBuffer.forEach(function(item, index){
                        /*
                            不是我不想放在外面
                            当发出帖子的时候并搜到帖子的时候，总要刷新一下吧

                    */
                        var left_column = $$.selector("div","left_column")[0],
                            post_ol = $$.getParentByClass(left_column,'posts')[0];
                        var post_container = $$.getParentByClass(left_column,"post_container");

                        tab_anchor[0].style.backgroundImage = "url(images/Tumblr_icon1.png)";
                        var content = JSON.parse(item);
                        var tempoNode = that.post_node.cloneNode(true);
                        post_ol.insertBefore(tempoNode, post_container[1]);
                        //post_ol.insertBefore(tempoNode, post_container[1]);
                        post_container = $$.getParentByClass(left_column,"post_container");
                        var post_content = $$.getParentByClass(post_container[1],"post_content")[0];
                        var post_link = $$.getParentByClass(post_container[1],"post_info_link")[0];
                        console.log(content.author);
                        post_link.innerHTML = content.author;
                        post_content.style.textIndent = '20px';
                        post_content.innerHTML = "";

                        var contentInnerHTML = "";
                        content.content.forEach(function(item, index){
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

                        post_content.innerHTML = contentInnerHTML;
                        // 刷新新增的博文和头像
                        var avator = $$.getParentByClass(tempoNode,"post_avator")[0];
                        that["refreshPostAvator"](tempoNode, avator);
                        tab_anchor[0].onclick = null;
                        that.postBuffer = [];
                        contentInnerHTML = "";
                    })
                };



            });
        },
        postNew: function(email, content){
            this.socket.emit('postNew', email, content);
        },

        setFunction: function(para){
            console.log(para);
            Post.prototype["refreshPostAvator"] = para;
        }
    }

    return Post;
})