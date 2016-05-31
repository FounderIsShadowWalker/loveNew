var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

var URL = require('url');
var User = require('../model/User.js');
var Post = require("../model/Post.js");
var Comment = require("../model/Comment.js");
var Test = require("../model/Test.js");


var db = require("../util/mongodb.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Tumblr', { title: 'Express' });
});

router.get('/Tumblr_login', function(req, res, next) {
  res.render('Tumblr_login', { title: 'Express' });
});

router.get('/Tumblr_register', function(req, res, next) {
  res.render('Tumblr_register', { title: 'Express' });
});

router.post('/Tumblr_login_test', function(req,res,next){

  console.log(req.body['myEmail']);
  console.log(req.body['password']);

 function returnValue(para) {
   switch (para){
     case "success":
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.write("success");
       res.end();
       break;
     case "password fail":
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.write("password fail");
       res.end();
       break;
   }
 }


  function login(){
    return new Promise(function (resolve, reject) {
          User.findOne({email: req.body['myEmail']}).exec(function (err, docs) {
              if (docs.password == req.body['password']) {
                resolve("success");
              }
              else {
                resolve("password fail");
              }
          })

        });
  }

  new Promise(function(resolve,reject){
    resolve("123");
  }).then(function(){
       return login();
      }).then(returnValue).catch(function(){
        console.log("登录失败");
      });
});

router.post('/Tumblr_register_test', function(req,res,next){

    console.log("register");

    console.log(req.body['email']);
    console.log(req.body['username']);
    console.log(req.body['password']);

  var  userInfo = {
      email: req.body['email'],
      username:req.body['username'],
      password:req.body['password'],
      //post: [{ _id : new ObjectId()}]
    }



  User.count(userInfo,function(err,docs){
     if(docs == 0){
       var user = new User(userInfo);
       user.save();
       console.log("注册成功");
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.write("success");
       res.end();
     }
     else{
       console.log("邮箱被占用");
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.write("fail");
       res.end();
     }
  })


})


router.post('/checkEmail', function(req,res,next){

  function checkEmail(resolve){
    User.count({email : req.body["email"]}, function(err, docs){
        if(docs == 1){
           resolve("success");
        }
        else{
            resolve("fail");
        }
    })
  }

  function returnValue(para) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(para);
    res.end();
  }

  new Promise(function(resolve,reject){
      checkEmail(resolve);
  }).then(returnValue);
});


router.get('/HomePage', function(req, res){
   var args = URL.parse(req.url, true);
    User.findOne({email: args.query.email}).populate('posts').exec(function(err,doc){
        console.log(doc.posts);
        res.render('HomePage', {post : JSON.stringify(doc.posts)})
    })
});

router.post('/HomePage', function(req, res){

      var AVATAR_UPLOAD_FOLDER = '/avatar/';
      var TITLE = "写入图片失败";
      var form = new formidable.IncomingForm();

        form.encoding = 'utf-8';		//设置编辑
        form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小


      var exist = fs.existsSync(form.uploadDir);
      if(!exist){
          fs.mkdirsSync(form.uploadDir);
      }

      form.parse(req, function(err, fields, files){

          console.log(fields);
          var post = JSON.parse(fields.post);
          var avatorImgs = eval(fields.img);                //上传的图片组
          var count = 0;                                    //图片遍历数
           console.log(avatorImgs);

          if(err){
              res.locals.error = err;
              res.render('HomePage', { title: TITLE });
              return;
          }


          User.findOne({email: post.author}).exec(function (err, docs) {
              console.log("好友列表")
              var friendList = docs.friendList;

              //先找到User._id  然后给关联的集合属性 插入_id 然后关联查询
              var PostInfo = {
                  poster: docs._id,   // userId
                  title: post.title,
                  content: post.content
              }

              var poster = new Post(PostInfo);

              poster.save(function(){

                  //给发帖人写入发帖纪录
                  Post.findOne(PostInfo).populate('poster').exec(function(err, docs){
                      //console.log(docs);
                      var post_id = docs._id;
                      docs.poster.posts.push(docs._id);
                      User.update({_id : docs.poster._id}, {posts : docs.poster.posts},function(err, doc){

                        //给发帖人的好友写发帖纪录
                         friendList.forEach(function(item,index) {
                             User.findOne({email: item}).exec(function (err, doc) {
                                 console.log(doc);
                                 doc.posts.push(post_id);
                                 doc.save();
                             })
                         });
                      });

                  })
              });
          });

          
         // function findUserId(resolve){
         //
         //     User.findOne({email: post.author}).exec(function (err, docs) {
         //         console.log("好友列表")
         //         var friendList = docs.friendList;
         //
         //         //先找到User._id  然后给关联的集合属性 插入_id 然后关联查询
         //         var PostInfo = {
         //             poster: docs._id,   // userId
         //             title: post.title,
         //             content: post.content
         //         }
         //
         //         var poster = new Post(PostInfo);
         //         poster.save();
         //         resolve(PostInfo);
         //     });
         // }
         //
         //function PostWrite() {
         //    Post.findOne(PostInfo).populate('poster').exec(function (err, docs) {
         //        //console.log(docs);
         //        var post_id = docs._id;
         //        docs.poster.posts.push(docs._id);
         //        User.update({_id: docs.poster._id}, {posts: docs.poster.posts}, function (err, doc) {
         //            resolve(post_id);
         //        });
         //    })
         //}
         //
         //
         //new Promise(function(resolve, reject){
         //    findUserId(resolve);
         //}).then(function(resolve, reject){
         //      PostWrite(resolve);
         //    }).then(function(resolve, reject){
         //
         //    });

          var extName = ''; //后缀名


          //上传图片
          for(var i in files){

              switch (files[i].type){

                  case 'image/jpeg':
                      extName = 'jpg';
                      break;
                  case 'image/png':
                      extName = 'png';
                      break;
                  case 'image/x-png':
                      extName = 'png';
                      break;

              }

              if (extName.length == 0) {
                  res.locals.error = '只支持png和jpg格式图片';
                  res.render('index', {title: TITLE});
                  return;
              }

              var avatarName = avatorImgs[count];
              var newPath = form.uploadDir + avatarName;
              count++;

              fs.renameSync(files[i].path, newPath);  //重命名
          }

      })

    res.locals.success = '上传成功';
    res.render('HomePage', { title: TITLE });

})

module.exports = router;
