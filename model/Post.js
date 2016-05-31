var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    poster: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type:Schema.Types.ObjectId, ref: 'Comment'}],
    title: String,
    content: String
})

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;