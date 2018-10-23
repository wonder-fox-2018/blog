const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URL}`);
var Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  article: {
    type: Schema.Types.ObjectId, 
    ref: 'Article' 
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment