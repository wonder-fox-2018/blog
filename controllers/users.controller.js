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
        .then((response) => {
            res.status(201).json({
                message: "User Successfully Created",
                user: response
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
            .exec()
            .then((response) => {
                res.status(200).send({
                    users: response
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
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        ModelUser
            .findById(decoded.id)
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
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);        
        ModelUser
            .findById(decoded.id)
            .then((user) => {
                let updateValue = {
                    first_name: req.body.first_name || user.first_name,
                    last_name: req.body.last_name || user.last_name,
                    password: req.body.password || user.password
                }
                ModelUser
                    .update(
                        { _id: user._id},
                        {$set: updateValue}
                    )
                    .then((response) => {
                        return res.status(200).json({
                            message: "User Successfully Updated",
                            response
                        })
                    })
                    .catch((err) => {reject()})
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error!!',
                    err
                });
            })
    },

    userDelete: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);        
        ModelUser
            .remove({_id: decoded.id})
            .then((response) => {
                res.status(200).json({
                    message: "User successfully deleted",
                    response
                })
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }
}