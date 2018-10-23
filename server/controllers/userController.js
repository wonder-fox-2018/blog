const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

class UserController{
    static register(req, res){
        User.create({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password            
        })
        .then(user => {
            res.status(201).json({
                user,
                success : true, 
                message : "Register success"
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static registerAdmin(req, res){
        User.create({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            role : 'admin'
        })
        .then(user => {
            res.status(201).json({
                user,
                success : true, 
                message : "Register success"
            })
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static login(req, res){
        User.findOne({ email : req.body.email })
        .then(login => {
            let passIsValid = bcrypt.compareSync(req.body.password, login.password)
            if(passIsValid){
                let token = jwt.sign({
                    id : login._id,
                    email : login.email,
                    username : login.username,
                    role : login.role
                }, process.env.SECRET)

                res.status(200).json({
                    token : token,
                    username : login.username,
                    message : "login Success"
                })
            }else {
                res.status(400).json({
                    message : 'Wrong email or password'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message : 'Email and Password must be filled'
            })
        })

    }
    static showProfile(req, res){
        console.log(req.login.id)
        User.findOne({_id : req.login.id})
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static editProfile(req, res){

    }

    static deleteProfile(req, res){
        User.findOneAndDelete({_id : req.params.id})
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }
    static showAllUser(req, res){
        User.find({})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController