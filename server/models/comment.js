var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    article: {
        type: Schema.Types.ObjectId, ref: 'Article'
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps:true});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;