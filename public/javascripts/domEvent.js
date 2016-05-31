define(['N'],function(){
    var search = document.querySelector('#search_query'),
    loginForm = $$.selector('div','login_form')[0],
    start = $$.getParentByClass(loginForm,'start')[0],
    signup = $$.getParentByClass(loginForm,'signup')[0],

    loginButton = $$.selector("a","login")[0],
    signupButton = $$.selector("a","signup")[0];

    start.addEventListener('click', function(){
        window.location.href = "Tumblr_register";
    });

    signup.addEventListener('click', function(){
        window.location.href = "Tumblr_login";
    });

    loginButton.addEventListener('click', function(){
        window.location.href = "Tumblr_login";
    });


    signupButton.addEventListener('click', function(){
        window.location.href = "Tumblr_register";
    });

    search.addEventListener('focus', function(){
        search.className ="search_active";
    },false);

    search.addEventListener('blur', function(){
        search.className ="search_nonactive";
    },false);

})