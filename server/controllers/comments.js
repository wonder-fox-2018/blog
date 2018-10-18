const Comment = require("../models/comments"),
  Article = require("../models/articles")

module.exports = {
  list: (req, res) => {
    // console.log("masuk controllers/comments -> list");
    Article.findOne({
      _id: req.params.artid
    })
      .populate("commentlist")
      .exec(function(err) {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        } else {
          Comment.find()
            .populate("owner")
            .exec(function(err, comments) {
              if (err) {
                res.status(500).json({
                  message: err.message
                });
              } else {
                res.status(200).json({
                  comments: comments
                });
              }
            });
        }
      });
  },

  findById: (req, res) => {
    // console.log("masuk controllers/comments -> owner");
    Comment.find({
      _id: req.params.comid
    })
      .populate("owner")
      .exec(function(err, comment) {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        } else {
          res.status(200).json({
            comment: comment
          });
        }
      });
  },

  insert: (req, res) => {
    // console.log("masuk controllers/comments -> create");
    let commt = new Comment({
      owner: req.userId,
      comment: req.body.comment
    });
    commt.save(function(err) {
      if (!err) {
        Article.updateOne({
          _id: req.params.artid
        }, {
          $push: {commentlist: commt._id}
        }, function(err) {
          if (!err) {
            // console.log('masuk')
            res.status(200).json({
              message: `succesfully create comment`,
              commt
            });
          } else {
            console.log('masuk else')
            res.status(500).json({
              message: err.message
            });
          }
        })
      } else {
        console.log('masuk else 2')
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  remove: (req, res) => {
    // console.log("masuk controllers/comments -> delete");
    Comment.find({
      _id: req.params.id
    },
      function(err, comment) {
        if (comment) {
          if (String(comment[0].owner) === String(req.userId)) {
            Comment.deleteOne({
              _id: req.params.id,
              owner: req.userId
            },    
            function(err) {
              if (!err) {
                res.status(200).json({
                  message: `succesfully delete comment`
                })
              } else {
                res.status(500).json({
                  message: err.message
                })
              }
            })
          } else {
            res.status(500).json({
              message: 'not your own comment'
            });
          }
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  }
};
