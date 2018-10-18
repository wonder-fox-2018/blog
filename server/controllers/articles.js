const Article = require("../models/articles")

module.exports = {
  list: (req, res) => {
    // console.log('masuk controllers/articles -> list')
    Article.find()
      .populate("author")
      .populate({
        path: "commentlist",
        populate: {
          path: "owner"
        }
      })
      .exec(function(err, articles) {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        } else {
          res.status(200).json({
            articles: articles
          });
        }
      });
  },

  getArticleById: (req, res) => {
    // console.log('masuk controllers/articles -> getById')
    Article.find({
      _id: req.params.id
    })
      .populate("author")
      .populate({
        path: "commentlist",
        populate: {
          path: "owner"
        }
      })
      .exec(function(err, article) {
        if (err) {
          console.log('error ni', err)
          res.status(500).json({
            message: err.message
          });
        } else {
          // console.log('masuk', article)
          res.status(200).json({
            article: article
          });
        }
      });
  },

  getMyArticle: (req, res) => {
    // console.log('masuk controllers/articles -> list my articles')
    Article.find({
      author: req.userId
    })
      .populate("author")
      .exec(function(err, data) {
        if (!err) {
          res.status(200).json({
            message: `get all of my articles`,  
            data
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      });
  },

  insert: (req, res) => {
    // console.log('masuk controllers/articles -> create')
    let arts = new Article({
      title: req.body.title,
      author: req.userId,
      desc: req.body.desc,
      category: req.body.category,
      commentlist: req.body.commentlist
    });
    arts.save(function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully made article`,
          arts
        });
      } else {
        res.status(500).json({
          message: err.message
        });
      }
    });
  },

  update: (req, res) => {
    // console.log('masuk controllers/articles -> update')
    const upd = {
      title: req.body.title,
      author: req.userId,
      desc: req.body.desc,
      category: req.body.category
    };
    Article.updateOne({
        _id: req.params.id
      }, upd, function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully updated articles`,
            upd
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  },

  remove: (req, res) => {
    // console.log('masuk controllers/articles -> delete')
    Article.deleteOne(
      {
        _id: req.params.id
      },
      function(err) {
        if (!err) {
          res.status(200).json({
            message: `succesfully deleted article`
          });
        } else {
          res.status(500).json({
            message: err.message
          });
        }
      }
    );
  }
};
