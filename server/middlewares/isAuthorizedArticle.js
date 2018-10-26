'use strict'
const Article = require('../models/article')

function isAuthorizedArticle(req,res,next){
    //Found article
    Article.findOne({
        _id: req.params.id
    })
      .then(article => {
        if(article.author == req.decoded.userid) {
            next()
        } else if (article.author != req.decoded.userid) {
            res.status(401).json({
                msg: 'User is not authorized to update/delete article'
            })
        }
      })
      .catch(error => {
        res.status(500).json({
           msg: 'ERROR Update/Delete Article -- ',error
        }) 
      })
}

module.exports = isAuthorizedArticle