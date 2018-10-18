const Article = require("../models/article");
const User = require("../models/user");

function authDataArticle(req, res, next) {
  Article.findById(req.params.id)
    .populate("author")
    .then(function(article) {
      if (article.author._id == req.userId) {
        next();
      } else {
        res.status(500).json({
          message: `access denied`
        });
      }
    })
    .catch(function(err) {
      res.status(404).json({
        message: `article not found`
      });
    });
}

module.exports = authDataArticle;
