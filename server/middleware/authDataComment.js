const Comment = require("../models/comment");

function autDataComment(req, res, next) {
  Comment.findById(req.params.id)
    .then(function(comment) {
      if (comment.user._id == req.userId) {
        next();
      }
    })
    .catch(function() {
      res.status(500).json({ message: `access daniend` });
    });
}

module.exports = autDataComment;
