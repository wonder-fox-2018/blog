var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CommentSchema = new Schema({
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'article' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Article'
	},
	'comment' : String,
	'createdAt' : {
		type : Date,
		default : new Date()
	}
});

module.exports = mongoose.model('Comment', CommentSchema);
