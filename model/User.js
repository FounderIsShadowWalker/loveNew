var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email : {type: String, unique: true},
    username : String,
    password: String,
    friendList:[],
    posts : [{type: Schema.Types.ObjectId, ref:'Post'}]
})

var User = mongoose.model('User', UserSchema);

UserSchema.methods.speak = function(){
    console.log('我的名字叫' + this.name);
}

module.exports = User;



