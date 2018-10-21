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

  isSelf: function(req, res) {
    let token = req.headers.token;
    if (token) {
      jwt.verify(token, process.env.ACCESS_KEY, function(err, decoded) {
        if (!err) {
          User.findById(decoded.userId)
            .then(function(user) {
              res.status(200).json({
                user
              })
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
  }
};
