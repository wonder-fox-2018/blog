const User = require('../models/user');
const ServerResponse = require('../helpers/serverResponse');
const encryptPassword = require('../helpers/encryptPassword');
const Token = require('../helpers/token');

module.exports = {
    create: (req, res) => {
       
        let {first_name, last_name, email, password} = req.body;

        let user = new User({
            first_name,
            last_name,
            email,
            password
        });
    
        user.save()
            .then((newUser) => {
                res.status(201).json({
                    message: 'user has been created'
                });
            })
            .catch((err) => {
                res.status(400).json(err);
            });
        
        
    },

    login: (req, res) => {
        req.body.password = encryptPassword(req.body.password);
        
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }).then((result) => {
            
            if (result) {
                let token = Token.sign(result);
                res.status(200).json({token});
            } else {
                res.status(401).json({
                    message: 'invalid email or password'
                });
            }
        }).catch((err) => {
            res.status(400).json(err);
        });
    },

    getUserProfile: (req, res) => {
        User.findOne({
            _id: req.decoded.id
        }).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            
        });
    }
};
