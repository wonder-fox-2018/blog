'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')

function isLogin(req,res,next){
    // check properties
    if(req.headers.hasOwnProperty('token')){
        
        //verify the token
        jwt.verify(req.headers.token,process.env.SECRETTOKEN,(err,decoded)=>{
            if(!err){
                let decodedobj = decoded
                User.findOne({
                    _id: decoded.userid
                })
                  .then(user=>{
                     if(user){
                         req.decoded = decodedobj
                         next()
                     }else{
                         res.status(400).json({
                             msg: 'ERROR TOKEN User not found'
                         })
                     }
                  })
                  .catch(error=>{
                       res.status(500).json({
                           msg: 'ERROR Get User TOKEN ',error
                       }) 
                  })
            }else{
                res.status(500).json({
                    msg: `ERROR Token Verify `,err
                })
            }
        })
    }else{
        res.status(401).json({
            msg: `ERROR TOKEN: User is not authorized`
        })
    }
}

module.exports = isLogin