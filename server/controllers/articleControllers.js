const Article = require("../models/article");
const Comment = require("../models/comment");

module.exports = {
  
  findAll: function(req, res) {
    const options= {
      page : parseInt(1, 10),
      limit : parseInt(5, 10),
      sort : {createdAt: 'desc'},
      populate : "author"
    }

    Article.paginate({}, options)
      .then((articles) => {
        res.status(201).json({
          articles
        })
      }).catch((err) => {
        res.status(201).json({
          err
        })
    });
    // Article.find()
    //   .sort({createdAt: 'desc'})
    //   .populate("author")
    //   .limit(5)
    //   .then(articles => {
    //     res.status(201).json({
    //       articles
    //     });
    //   })
    //   .catch(err => {
    //     res.status(500).json({
    //       err,
    //       message: `article not found`
    //     });
    //   });
  },

  findOne: function(req, res) {
    Article.findOne({ _id: req.params.id })
      .populate("author")
      .populate({ path: "comments", populate: { path: "user" } })
      .then(article => {
        res.status(200).json({
          article
        });
      })
      .catch(err => {
        res.status(404).json({
          err
        });
      });
  },

  myarticle: function(req,res) {

    Article.find({author : req.userId})
      .sort({createdAt: 'desc'})
      .populate("author")
      .then((articles) => {
        res.status(201).json({
          articles
        })
      })

  },

  create: function(req, res) {
    let dataArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      picture: req.body.picture,
      author: req.userId
    });

    dataArticle
      .save()
      .then(article => {
        res.status(201).json({
          article,
          message: `${article.title} created`
        });
      })
      .catch(err => {
        res.status(500).json({
          err
        });
      });
  },

  update: function(req, res) {
    Article.updateOne(
      { _id: req.params.id },
      {
        title: req.body.title,
        content: req.body.content,
        picture: req.body.picture
      },
      { runValidators: true }
    )
      .then(article => {
        res.status(201).json({
          article,
          message: `update ${req.body.title} success`
        });
      })
      .catch(err => {
        res.status(404).json({ err });
      });
  },

  remove: function(req, res) {
    Article.findByIdAndDelete(req.params.id)
      .then(article => {
        Comment.deleteMany({ _id: { $in: article.comments } })
          .then(result => {})
          .catch(err => {});

        res.status(201).json({
          article,
          message: `delete article success`
        });
      })
      .catch(err => {
        res.status(404).json({ err });
      });
  },

  searchByTitle: function(req, res) {
    Article.find({ title: { $regex: req.query.title, $options: "i" } })
      .populate("author")
      .then(articles => {
        res.status(201).json({ articles });
      })
      .catch(err => {});
  },

  searchByCategory: function(req, res) {
    Article.find({ category: req.query.categoryid })
      .populate("category", "name")
      .populate("author")
      .then(articles => {
        res.status(201).json({ articles });
      })
      .catch(err => {});
  },

  articlePagginations (req,res) {
    const {page, perPage} = req.query;
    const options= {
      page : parseInt(page, 10),
      limit : parseInt(perPage, 10),
      sort : {createdAt: 'desc'},
      populate : "author"
    }

    Article.paginate({}, options)
      .then((articles) => {
        res.status(201).json({
          articles
        })
      }).catch((err) => {
        res.status(201).json({
          err
        })
    });

  }
};
