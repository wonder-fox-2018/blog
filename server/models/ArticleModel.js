var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	'title': {
        type: String,
        required: true
    },
	'content': {
        type: String,
        required: true
    },
	'author': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	'comments': Array
},{
    versionKey: false,
    timestamps : true
});

module.exports = mongoose.model('Article', ArticleSchema);