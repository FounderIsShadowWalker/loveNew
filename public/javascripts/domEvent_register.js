define(['N','fullPage'],function(){
    var search = document.querySelector('#search_query'),
        loginButton = $$.selector("a","login")[0],
        signupButton = $$.selector("a","signup")[0],

    //登陆按钮
    //next = $$.selector('button','move')[0],
        hideValidate = $$.selector('button','hideValidate')[0],
        hideSpan = $$.getParentByTag(hideValidate, 'span')[0],
        inputField = $$.selector('div','inputField')[0],
        start = $$.getParentByClass(inputField,'start')[0],

        inputPassword = $$.getParentByClass(inputField,'password')[0],
        userButton =  $$.getParentByClass(inputField,'username')[0],
        nextButton = $$.getParentByClass(inputField,'nextEmail')[0],
        nextEmail = $$.getParentByClass(nextButton,'email')[0],
        password = $$.getParentByClass(inputPassword,'email')[0],
        username = $$.getParentByClass(userButton,'email')[0],

        move = $$.selector('button','move')[0],
        moveSpan =  $$.getParentByTag(move,'span')[0],
        email = $$.selector('input','email')[0];

    var emailValidate = function(str){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(str);
    }

    var  moveToLogin = function(){
        window.location.href = "Tumblr_login"
    };

    search.addEventListener('focus', function(){
        search.className ="search_active";
    },false);

    search.addEventListener('blur', function(){
        search.className ="search_nonactive";
    },false);


    move.addEventListener('click', moveToLogin, false);

    start.addEventListener('click', function () {
        moveSpan.innerHTML = "注册";

        move.removeEventListener('click',moveToLogin,false);
        userButton.style.height = "45px";
        inputPassword.style.height = "45px";
        inputField.style.marginLeft = "-350px";

        move.addEventListener('click', function() {
            if (emailValidate(email.value)){

                var para = {
                    email: email.value,
                    username: username.value,
                    password: password.value
                }
                $$.request("post", "/Tumblr_register_test", function (result) {
                    switch (result){
                        case "success":
                            hideSpan.innerHTML = "注册成功";
                            $$.removeClass(hideValidate, "hideValidate");
                            setTimeout(function(){
                                window.location.href = "Tumblr_login";
                            },1000);
                            break;
                        case "fail":
                            hideSpan.innerHTML = "注册失败";
                            $$.removeClass(hideValidate, "hideValidate");
                            break;
                    }

                }, para);
            }
            else{
                $$.removeClass(hideValidate, "hideValidate");
            }
        })

    });

    loginButton.addEventListener('click', function(){
        window.location.href = "Tumblr_login"
    })
    return {
        top: null,

        /**
         * 虽然方法名为loginButton 但是 实际是登陆按钮，因为操作一致，就懒得改名了
         */

        loginButton: function(){
            var that = this;
            signupButton.addEventListener('click',function(){
                signupButton.style.width = "0px";
                signupButton.style.padding = "0";
                signupButton.style.marginRight = "0";

                that.top();
            },false);
        },
        loginButtonReset: function(){
            signupButton.removeAttribute('style');
        },
        loginButtonHide: function(){
            signupButton.style.width = "0px";
            signupButton.style.padding = "0";
            signupButton.style.marginRight = "0";
        }
    }
})