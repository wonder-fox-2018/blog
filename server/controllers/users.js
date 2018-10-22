const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()
    
module.exports = {
    add: (req, res) => {        
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });

    },
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        })
        .then((result) => {
            if(!result){
                res.status( 400 ).json({
                    msg: 'User tidak ditemukan!'
                })
            }
            let valid = bcrypt.compareSync(req.body.password, result.password)
            if (valid){
                jwt.sign({
                    id: result._id,
                    name: result.name,
                    email: result.email
                }, process.env.JWT_SECRET, (err, token) => {
                    if(err){
                        res.status( 500 ).json({
                            msg : err.message
                        })
                    } else {
                        res.status( 200 ).json({
                            msg : 'login berhasil',
                            token : token
                        })
                    }
                })
            } else {
                res.status(403).json({
                    msg : "Wrong Password",
                    err : err
                });
            }
        })  
        .catch((err) => {            
            res.status(500).json({msg: 'login gagal', err: err})
        });
    },
    update: (req, res) => {
        User.updateOne({
            _id : req.params.id
        },{ $set: {
            name : req.body.name,
            email : req.body.email,
        }})
        .then(result=>{
            res.status(200).json({
            msg : `success updating user`,
            result : result
            })
        })
        .catch(err=>{
            res.status(500).json({
            msg : "failed updating user",
            err : err
            });
        });
    },
    getUser: (req, res) => {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        if(decoded){
            res.status(200).json({ decoded })
        } else {
            res.status(400).json({msg: 'not found'})
        }
            
            
        
    }



}