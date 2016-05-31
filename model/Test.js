/**
 * Created by founder on 8/20/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TestSchema = new Schema({
    name:String
})

TestSchema.methods.speak = function(){
    console.log('我的名字叫'+this.name);
}

var Test = mongoose.model('Test',TestSchema);
module.exports = Test;