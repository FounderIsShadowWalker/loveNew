var db = require("../util/mongodb.js");var User = require('../model/User.js');
var Post = require("../model/Post.js");
var Comment = require("../model/Comment.js");
var Test = require("../model/Test.js");

function socketIO(io) {
    io.on('connection', function (socket) {

        socket.on('login', function (email) {
            socket.email = email;
            console.log("有人登陆了");
            console.log("邮箱号是:" + email);
        });

        socket.on('postNew', function (email, content) {
            console.log(socket.email + "发了条动态");
            var clients = io.sockets.sockets;

            User.findOne({email: email}).exec(function (err, docs) {
                var friendList = docs.friendList;

                clients.forEach(function (client) {
                    if (friendList.indexOf(client.email) === 0) {
                        client.emit('getNew', email, content);
                    }
                })

            });
        })
    })
}

module.exports = socketIO;