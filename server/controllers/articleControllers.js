const Article = require("../models/article");

module.exports = {
  findAll: function(req, res) {
    Article.find()
      .populate("author")
      .then(articles => {
        res.status(201).json({
          articles
        });
      })
      .catch(err => {
        res.status(500).json({
          err,
          message: `article not found`
        });
      });
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
    Article.deleteOne({ _id: req.params.id })
      .then(article => {
        res.status(201).json({
          article,
          message: `delete article success`
        });
      })
      .catch(err => {
        res.status(404).json({ err });
      });
  }
};
