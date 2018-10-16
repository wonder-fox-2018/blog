'use strict'

const ModelUser = require('../models/UserModel');
const jwt = require('jsonwebtoken');

module.exports = {
    userCreate: (req, res) => {
        let newUser = new ModelUser ({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
        newUser
        .save()
        .then((result) => {
            res.status(201).json({
                message: "User Successfully Created",
                user: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error Creating User!!',
                err
            });
        })
    },
    userReadAll: (req, res) => {
        ModelUser
            .find()
            .then((result) => {
                res.status(200).send({
                    users: result
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error!!',
                    err
                });
            })
    },
    userReadById: (req, res) => {
        ModelUser
            .findById(req.currentuser._id)
            .then((user) => {
                if(user) {
                    res.status(200).json({
                        message: `Welcome ${user.first_name}`,
                        user
                    })
                } else {
                    throw 'User not found!'
                }
            })
            .catch((err) => {
                res.status(404).json({
                    message: 'User not Found',
                    err
                });
            })
    },

    userUpdate: (req, res) => {  
        let updateValue={}; 
        Object.assign(updateValue, 
            req.body.first_name ? { first_name : req.body.first_name } : null,
            req.body.last_name ? { last_name : req.body.last_name } : null,
            req.body.password ? { password: req.body.password } :null
        );
        ModelUser
            .findOneAndUpdate(
                { _id: req.currentuser._id },
                { updateValue })
            .then((result) => {
                return res.status(200).json({
                    message: "User Successfully Updated",
                    result
                })
            }).catch((err) => {
                res.status(500).json({ message: 'Error!!', err });
            });
    },
    userDelete: (req, res) => {    
        ModelUser
            .deleteOne({_id: req.currentuser._id})
            .then((result) => {
                res.status(200).json({
                    message: "User successfully deleted",
                    result
                })
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }
}