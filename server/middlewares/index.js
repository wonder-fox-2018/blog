require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    isLogin: function(req, res, next){
        let token = req.headers.token        
        if(token){
            let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            if(decoded){
                req.decoded = decoded
                next()
            } else {
                res.status(500).json({
                    status: 'failed',
                    message: 'Please Login first!'
                })
            }
        }
    }



}