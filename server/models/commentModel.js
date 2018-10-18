const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('../models/articleModel')

const commentSchema = new Schema({
  body: {
    type: String,
    required: [true, 'Body of comment required'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: [true, 'articleId required']
  }
});

commentSchema.post('validate', doc => {
  Article.updateOne({
      _id: doc.articleId
    }, {
      $push: {
        commentId: doc._id
      }
    })
    .then(data => {})
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment
