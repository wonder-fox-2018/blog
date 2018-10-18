require('dotenv').config();

const User = require("../models/users"),
  jwt = require("jsonwebtoken"),
  Article = require("../models/articles");

module.exports = {
  isLogin: function(req, res, next) {
    // console.log('masuk middlewares/auth')
    let token = req.headers.token;
    if (token) {
      jwt.verify(token, process.env.ACCESS_KEY, function(err, decoded) {
        if (!err) {
          User.findById(decoded.userId)
            .then(function() {
              req.userId = decoded.userId;
              next();
            })
            .catch(function() {
              res.status(500).json({
                message: `access denied`
              });
            });
        } else {
          res.status(500).json({
            message: `access denied`
          });
        }
      });
    } else {
      res.status(500).json({
        message: `login first to access this feature`
      });
    }
  },

  authdulu: function(req, res, next) {
    Article.findOne({
      author: req.userId
    })
      .populate("author")
      .then(function(article) {
        next();
      })
      .catch(function(err) {
        res.status(500).json({
          message: `access denied`
        });
      });
  }
};
