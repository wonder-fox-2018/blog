const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: function(req, res) {
    let dataUser = new User({
      name: req.body.name,
      picture: req.body.picture,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password
    });

    dataUser
      .save()
      .then(user => {
        res.status(201).json({
          user,
          message: `registrasi success`
        });
      })
      .catch(err => {
        res.status(500).json({
          err,
          message: `registrasi failed`
        });
      });
  },

  login: function(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            jwt.sign(
              {
                userId: user._id
              },
              process.env.ACCESS_TOKEN,
              function(err, token) {
                if (!err) {
                  res.status(201).json({
                    name: user.name,
                    email: user.email,
                    token: token
                  });
                } else {
                  res.status(500).json({
                    message: `Email and password didn't match`
                  });
                }
              }
            );
          } else {
            res.status(500).json({
              message: "email and password didnt match"
            });
          }
        } else {
          res.status(404).json({
            message: "you did not have account, please signup first"
          });
        }
      })
      .catch(err => {});
  }
};
