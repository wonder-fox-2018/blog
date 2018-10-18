const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const errCatcher = require('../helpers/errCatcher')

class ControllerUser {

  static getUserData(req, res) {
    User.findOne({
        _id: req.decoded.id
      })
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: {
            id: data._id,
            fname: data.fname
          }
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static register(req, res) {
    let data = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password
    }

    let user = new User(data)

    user.save()
      .then(newUser => {
        res.status(201).json({
          status: 'success',
          message: `success creating new account with email ${newUser.email}`,
          data: data
        })
      })
      .catch(err => {
        let msg = errCatcher(err.message)
        if (msg.indexOf(',')) {
          msg = msg.split(',')[0]
        }
        res.status(500).json({
          status: 'failed',
          message: msg
        })
      })
  }

  static login(req, res) {
    User.findOne({
        email: req.body.email
      })
      .then(data => {
        if (data) {
          if (bcrypt.compareSync(req.body.password, data.password)) {

            let token = jwt.sign({
              id: data._id,
              fname: data.fname,
              role: data.role
            }, process.env.JWT_HASH)

            res.status(200).json({
              status: 'success',
              token: token
            })
          } else {
            res.status(500).json({
              status: 'failed',
              message: 'wrong password or email'
            })
          }
        } else {
          if (req.body.email === '') {
            res.status(500).json({
              status: 'failed',
              message: 'wrong password or email'
            })
          } else {
            res.status(404).json({
              status: 'failed',
              message: 'user not found'
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: 'wrong password or email'
        })
      })
  }
}

module.exports = ControllerUser
