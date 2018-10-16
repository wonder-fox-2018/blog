var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps:true});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;