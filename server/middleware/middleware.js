const User = require('../models/users')
const jwt = require('jsonwebtoken')
const Mongoose = require('mongoose');

class Middleware {
    //AUTHENTICATE
    static authenticate(req, res, next) {
        let token = req.headers.token
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (!err) {
                    User.findById(decoded.userId)
                        .then(function (user) {
                            req.id = user._id
                            req.dataUser = user
                            next()
                        })
                } else {
                    res.status(403).json({
                        message: 'invalid token'
                    })
                }
            })
        } else {
            res.status(403).json({
                message: 'token not found'
            })
        }
    }

    //IS OWNER
    static isOwner(req,res,next){
        const id = new Mongoose.Types.ObjectId(req.params.id)

        User.find({'tablename' : {$in:id}})
        .then(data =>{
            if(data[0].id === req.id.toString()){
                next()
            }
        })
    }
}

module.exports = Middleware;