'use strict'
const Commentary = require('../models/comment')

function isAuthorizedComment(req,res,next) {
    Commentary.findOne({
        _id: req.params.id
    })
      .then(comment => {
        if(comment.userid  == req.decoded.userid){
            next()
        } else if (comment.userid  != req.decoded.userid) {
            res.status(403).json({
                msg: 'User is not authorized to delete comment'
            })
        }
      })
      .catch(error => {
        res.status(500).json({
            msg: 'ERROR Delete Comment -- ',error
         }) 
      })
}

module.exports = isAuthorizedComment