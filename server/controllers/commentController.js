const Comment = require("../models/comment");
const User = require("../models/user");
const Article = require("../models/article");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function(req, res) {
    let dataComment = new Comment({
      status: req.body.status,
      user: req.userId
    });

    dataComment.save().then(function(comment) {
      Article.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { comments: comment._id } }
      )
        .then(() => {})
        .catch(() => {});

      res.status(200).json({
        message: `create comment success`
      });
    });
  },

  update: function(req, res) {
    Comment.updateOne(
      { _id: req.params.id },
      { status: req.body.status },
      { runValidators: true }
    )
      .then(comment => {
        res.status(200).json({
          comment,
          message: `create comment success`
        });
      })
      .catch(err => {
        res.status(500).json({
          err,
          message: `create comment failed`
        });
      });
  },

  remove: function(req, res) {
    Comment.findByIdAndRemove(req.params.id)
      .then(function() {
        res.status(200).json({ message: `delete comment success` });
      })
      .catch(function() {
        res.status(500).json({ message: `delete comment failed` });
      });
  }
};
