define(['N','fullPage'],function(){
    var search = document.querySelector('#search_query'),
        loginButton = $$.selector("a","login")[0],
        signupButton = $$.selector("a","signup")[0],
        next = $$.selector('button','move')[0],
        hideValidate = $$.selector('button','hideValidate')[0],
        hideValidateSpan = $$.getParentByTag(hideValidate,'span')[0],
        hidePasswordValidate = $$.selector('button','hidePasswordValidate')[0],
        hideloginResult = $$.getParentByTag(hidePasswordValidate,'span')[0],
        inputField = $$.selector('div','inputField')[0],
        inputPassword = $$.getParentByClass(inputField,'password')[0],
        password = $$.getParentByTag(inputPassword,'input')[0],
        nextButton = $$.getParentByClass(inputField,'nextEmail')[0],
        nextEmail = $$.getParentByClass(nextButton,'email')[0],
        move = $$.selector('button','move')[0],
        moveSpan =  $$.getParentByTag(move,'span')[0],
        email = $$.selector('input','email')[0];


    var emailValidate = function(str){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(str);
    }


    search.addEventListener('focus', function(){
        search.className ="search_active";
    },false);

    search.addEventListener('blur', function(){
        search.className ="search_nonactive";
    },false);

    signupButton.addEventListener('click', function(){
        window.location.href = "Tumblr_register";
    });

    next.addEventListener('click', function () {
       if(!emailValidate(email.value)){
           hideValidateSpan.innerHTML = "邮箱格式错误";
           $$.removeClass(hideValidate,"hideValidate");
       }

       if(emailValidate(email.value)) {
           hideValidate.className = "hideValidate";

           $$.request("post", "/checkEmail", function (result) {
               if (result == "fail") {
                   hideValidateSpan.innerHTML = "邮箱不存在";
                   $$.removeClass(hideValidate,"hideValidate");
               }
               else{
                 successEmail();
               }
           }, {email: email.value});


           function successEmail() {
               moveSpan.innerHTML = "登录";
               //在这里判断如果登陆时的邮箱不为空则要判断密码
               //提交表单

               var para = {
                   myEmail: email.value,
                   password: password.value
               };
               if (nextEmail.value != "") {
                   $$.request('post', '/Tumblr_login_test', function (para) {
                       switch (para) {
                           case "success":
                               hideloginResult.innerHTML = "登录成功";
                               window.location.href = 'HomePage?email=' + email.value;
                               break;
                           case "password fail":
                               hideloginResult.innerHTML = "密码失败";
                               break;
                       }
                       $$.removeClass(hidePasswordValidate, "hidePasswordValidate");
                   }, para);

               }
               else {
                   nextEmail.value = email.value;
                   inputPassword.style.height = "45px";
                   inputField.style.marginLeft = "-350px";
               }

           }
       }
    });
    return {
        top: null,

        loginButton: function(){
            var that = this;
            loginButton.addEventListener('click',function(){
                loginButton.style.width = "0px";
                loginButton.style.padding = "0";
                loginButton.style.marginRight = "0";

                that.top();
            },false);
        },
        loginButtonReset: function(){
            loginButton.removeAttribute('style');
        },
        loginButtonHide: function(){
            loginButton.style.width = "0px";
            loginButton.style.padding = "0";
            loginButton.style.marginRight = "0";
        }
    }
})