var mongoose = require('mongoose');

var  Schema = mongoose.Schema;

var CommentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref:'Post'},
    commenter: {type: Schema.Types.ObjectId, ref:'Post'},
    content: String
})

var Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment;