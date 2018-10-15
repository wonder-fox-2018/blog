'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const isEmail = require('../helpers/isEmail')
const hashPassword = require('../helpers/hashPassword')

class UserController {

    // register user
    static registerUser(req,res){

        if(isEmail(req.body.email)){
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                thirdpartylogin: 'NO'
            })
              .then(user=>{
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email
                },process.env.SECRETTOKEN,(err,token)=>{
                    if(!err){
                        res.status(201).json({
                            msg: 'Registration success',
                            token: token
                        })
                    }
                })
              })
              .catch(error=>{
                 res.status(500).json({
                    msg: 'ERROR Register User ',error 
                 })
              }) 
        }else{
            res.status(400).json({
                msg: 'Please check your email'
            })
        }
    }

    // login user
    static loginUser(req,res){
        let hash = hashPassword(req.body.password)
        if(isEmail(req.body.email)){
            User.findOne({
                email: req.body.email,
                password: hash
            })
             .then(user =>{
                // get the token
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email
                },process.env.SECRETTOKEN, (err,token)=>{
                    res.status(201).json({
                        msg: 'Login success',
                        token: token
                    })
                })
             })
             .catch(error =>{
                 res.status(500).json({
                     msg: 'ERROR Login User ',error
                 })
             })
        }else{
            res.status(400).json({
                msg: 'Please check your email'
            })
        }
    }

    // get details
    static getDetailUser(req,res){
        User.findOne({
            _id: req.decoded.userid
        }).populate('articleslist')
          .then(user =>{
              res.status(200).json({
                  msg: `Detail of user ${user.name}`,
                  data: user
              })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Get Details of User ',error
              })
          })
    }

    // get credentials
    static getCredentials(req,res){
        User.findOne({
            _id: req.decoded.userid
        })
          .then(user =>{
              res.status(200).json({
                  msg: `Basic info of user ${user.name}`,
                  name: user.name,
                  email: user.email
              })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: `ERROR Get Basic Info `,error
              })
          })
    }
}

module.exports = UserController