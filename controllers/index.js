'use strict'

const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    login: (req, res) => {
        User
            .findOne({email: req.body.email})
            .then((user) => {
                if(user) {
                    let flag = bcrypt.compareSync(req.body.password, user.password);
                    if(flag) {
                        res.status(200).json({
                            message: `Welcome ${user.first_name}`,
                            apptoken: jwt.sign({id: user._id}, process.env.JWT),
                            user: {
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email,
                                role: user.role
                            }
                        })
                    } else {
                        reject()
                    }
                } else {
                    reject()
                }
            })
            .catch((err) => {
                res.status(404).json({
                    message: 'Incorrect email or password!',
                    err
                });
            })
    }
}