const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const titleValidator = [
    validate({
        validator: 'isLength',
        arguments: [9, 100],
        message: 'Article title should be between {ARGS[0]} and {ARGS[1]} characters',
      })
]

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: titleValidator
  },
  content: {
    type: String,
    required: true
  },
  imgUrl:{
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  like: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }]
}, {timestamps: true})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article