const Comment = require('../models/commentModel')
const Article = require('../models/articleModel')
const errCatcher = require('../helpers/errCatcherArticle')

class CommentController {

  static createComment(req, res) {

    let data = {
      body: req.body.body,
      userId: req.decoded.id,
      articleId: req.params.id
    }

    let comment = new Comment(data)
    comment.save()
      .then(data => {
        res.status(201).json({
          status: 'success',
          message: `creating comment on article with id ${data.articleId} success`,
          data: data
        })
      })
      .catch(err => {
        let msg = errCatcher(err.message)
        res.status(500).json({
          status: 'failed',
          message: msg
        })
      })
  }

  static updateArticle(req, res) {
    Comment.updateOne({
        _id: req.params.id,
        userId: req.decoded.id
      }, {
        body: req.body.body
      }, {
        runValidators: true
      })
      .then(data => {
        if (data.nModified === 1) {
          res.status(200).json({
            status: 'success',
            message: 'success updating comment'
          })
        } else {
          res.status(500).json({
            status: 'failed',
            message: 'failed updating comment'
          })
        }
      })
      .catch(err => {
        let msg = errCatcher(err.message)
        res.status(500).json({
          status: 'failed',
          message: msg
        })
      })
  }

  static deleteComment(req, res) {
    Comment.deleteOne({
        _id: req.params.idComment,
        userId: req.decoded.id
      })
      .then(data => {
        if (data.n == 1) {
          Article.updateOne({
              _id: req.params.idArticle,
              commentId: req.params.idComment
            }, {
              $pull: {
                commentId: req.params.idComment
              }
            })
            .then(data => {
              res.status(200).json({
                status: 'success',
                message: `success deleting comment with id ${req.params.idComment}`
              })
            })
        } else {
          res.status(500).json({
            status: 'failed',
            message: 'failed when deleting comment'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

}

module.exports = CommentController
