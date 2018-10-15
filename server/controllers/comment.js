const Comment = require('../models/Comment')
const Article = require('../models/Article')

class Controller {
  
  static comment(req, res) {
    let newComment = {
      articleId: req.params.id,
      comment: req.body.comment,
      userId: req.decoded.id
    }
    
    Comment.create(newComment)
      .then(comment => {
        let commentId = comment._id
        
        Article.updateOne({_id: req.params.id}, {$push: {comments: commentId}})
          .then(() => {
            Comment.findById(commentId)
              .populate('userId', '_id name email')
              .then(comment => {
                res.status(201).json(comment)
              })
          })
          .catch(err => {
            res.status(500).json({error: err.message})
          })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static deleteComment(req, res) {
    Comment.deleteOne({_id: req.params.id})
      .then(() => {
        Article.updateOne({_id: req.body.articleId}, {$pull: {comments: req.params.id}})
          .then(() => {
            res.status(200).json({message: 'Comment deleted!', id: req.params.id})
          })
          .catch(err => {
            res.status(500).json({error: err.message})
          })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
}

module.exports = Controller