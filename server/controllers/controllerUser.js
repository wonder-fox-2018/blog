const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const errCatcher = require('../helpers/errCatcher')
const emailSender = require('../helpers/emailSender')
const {
  sendVerification,
  sendWellcomeEmail
} = emailSender

class ControllerUser {

  static changeAvatar(req, res) {
    User.updateOne({
        _id: req.decoded.id
      }, {
        avatar: req.file.cloudStoragePublicUrl
      })
      .then(data => {
        res.status(200).json({
          status: 'success',
          message: 'uploading file success'
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static verifyEmail(req, res) {

    let decoded = jwt.verify(req.headers.token, process.env.JWT_HASH)

    User.findOne({
        _id: decoded._id
      })
      .then(data => {
        if (data) {
          User.updateOne({
              _id: decoded._id
            }, {
              verified: 1
            })
            .then(data => {
              res.status(200).json({
                status: 'success',
                message: `Your email verified successfully`
              })
            })
        } else {
          res.status(500).json({
            status: 'failed',
            message: "Opp.. We can't find your account, please register for new one"
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static getUserData(req, res) {
    User.findOne({
        _id: req.decoded.id
      })
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: {
            id: data._id,
            fname: data.fname,
            avatar: data.avatar
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
        let VerifyToken = jwt.sign({
          _id: newUser._id
        }, process.env.JWT_HASH)

        sendWellcomeEmail(newUser.email, newUser.fname)
        sendVerification(newUser.email, newUser.fname, VerifyToken)

        res.status(201).json({
          status: 'success',
          message: `success creating new account with email ${newUser.email}`,
          data: data
        })
      })
      .catch(err => {
        console.log(err)
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
            if (data.verified === 1) {
              let token = jwt.sign({
                id: data._id,
                fname: data.fname,
                role: data.role
              }, process.env.JWT_HASH)

              res.status(200).json({
                status: 'success',
                fname: data.fname,
                token: token
              })
            } else {
              res.status(500).json({
                status: 'failed',
                message: 'please verify your email first'
              })
            }
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
          message: err.message
        })
      })
  }
}

module.exports = ControllerUser
