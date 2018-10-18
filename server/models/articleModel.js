const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title required'],
    maxlength: 35,
    validate: {
      validator() {
        if (this.title == '') {
          throw new Error('Title length must be greater than 1')
        }
      }
    }
  },
  description: {
    type: String,
    required: [true, 'Description required'],
    validate: {
      validator() {
        if (this.title == '') {
          throw new Error('Title length must be greater than 1')
        }
      }
    }
  },
  categoryId: {
    required: [true, 'Category required'],
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commentId: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article
