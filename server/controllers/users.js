require('dotenv').config()
let hashPass = require("../helpers/hashPass")

const User = require("../models/users"),
  jwt = require('jsonwebtoken')

module.exports = {
  list: (req, res) => {
    User.find()
      .then(user => {
        res.status(200).json({
          user: user
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  insert: (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  },

  register: (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        jwt.sign({
          userId: user._id
        }, process.env.ACCESS_KEY,
          function(err, token) {
            res.status(200).json({
              name: user.name,
              token: token
            })
          })
      })
      .catch(error => {
        res.status(500).json(error)
      })
  },

  login: function(req, res) {
    User.findOne({
      email: req.body.email,
      password: hashPass(req.body.password)
    })
      .then(user => {
        jwt.sign({
          userId: user._id
        }, process.env.ACCESS_KEY,
          function(err, token) {
            res.status(200).json({
              name: user.name,
              token: token
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          message: `email and password didn't match`
        })
      })
  },

  update: (req, res) => {
    const upd = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.updateOne({
      _id: req.params.id
    }, upd, function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully updated user: ${req.body.name}`
        })
      } else {
        res.status(500).json({
          message: err.message
        })
      }
    })
  },

  remove: (req, res) => {
    User.deleteOne({
      _id: req.params.id
    }, function(err) {
      if (!err) {
        res.status(200).json({
          message: `succesfully deleted user`
        })
      } else {
        res.status(500).json({
          message: err.message
        })
      }
    })
  }
}
