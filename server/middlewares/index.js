require('dotenv').config()
const Articles = require('../models/article')
const Comments = require('../models/comment')
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
    },
    isSelf: function(req, res, next){
        Articles.findOne({
            _id: req.params.id
        })
        .then((result) => {
            if(String(result.author) === req.decoded.id){
                next()
            } else {
                res.status(400).json({msg: "akses ditolak !!", err: err})
            }
        }).catch((err) => {
            res.status(500).json(err)

        });
    },
    isSelfComment: function(req, res, next){
        Comments.findOne({
            _id: req.params.id
        })
        .then((result) => {
            if(String(result.user) === req.decoded.id){
                next()
            } else {
                res.status(400).json({msg: 'akses ditolak !!', err: err})
            }
        }).catch((err) => {
            res.status(500).json(err)            
        });
    }
}