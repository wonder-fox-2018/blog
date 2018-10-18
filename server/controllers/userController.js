const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
        });
        user.save()
            .then(function(user) {
                const response = {
                    success: true,
                    message: `Account ${user.name} registered`
                };
                res.status(201).json(response);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then(function(user) {
                if (user) {
                    const token = jwt.sign({id: user._id, name: user.name, email: user.email, role: user.role},
                    process.env.SECRET_TOKEN);
                    res.status(201).json({token: token});
                } else {
                    const err = {
                        message: 'Wrong username or password'
                    };
                    res.status(400).json(err);
                }
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static getUserProfile(req, res) {
        User.findOne({email: req.user.email})
            .then(function(user) {
                res.status(200).json(user);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = UserController;