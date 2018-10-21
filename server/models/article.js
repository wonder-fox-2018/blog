const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URL}`);
var Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'http://3.bp.blogspot.com/-Iw7UP2Mpisw/T1iKZIDTy4I/AAAAAAAAcy0/gVvpFmbNp00/s1600/Stationary+Pen+Pencil+(7).jpg'
  },
  contents: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  likes: {
    type: Number,
    default: 0
  },
  watched: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article