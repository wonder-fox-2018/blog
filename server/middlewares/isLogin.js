'use strict'

const jwt = require('jsonwebtoken');
const ModelUser = require('../models/UserModel')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    isLogin: (req, res, next) => {
        
        if(req.headers.apptoken){
            let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
            let idCheck = ObjectId(decoded.id)
            ModelUser.findOne({ _id : idCheck,email : decoded.email })
            .then((result) => {
                if(result) {
                    //console.log(result)
                    req.currentuser=result
                    next()
                } else {
                    res.status(403).json({ msg : 'Token not found' });
                }
            })
        }
        else
            res.status(403).json({ msg : 'Token not found' });
        
     
    }
}