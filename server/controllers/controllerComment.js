const Comment = require('../models/commentModel')

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
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

}

module.exports = CommentController
