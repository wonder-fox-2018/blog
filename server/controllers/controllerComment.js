const Comment = require('../models/commentModel')
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
        res.status(500).json({
          status: 'failed',
          message: 'failed updating comment'
        })
      })
  }

}

module.exports = CommentController
