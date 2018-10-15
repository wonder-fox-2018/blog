'use strict'

const Article = require('../models/article')
const User = require('../models/user')

class ArticleController{

    // create article
    static createArticle(req,res){
        Article.create({
            title: req.body.title,
            description: req.body.description,
            author: req.decoded.userid
        })
          .then(article =>{
              let newArticle = article
              // update user table
              User.findOneAndUpdate({
                 _id: req.decoded.userid
              },{
                  $push: {
                      articleslist : newArticle._id
                  }
              })
                .then(user =>{
                    res.status(201).json({
                        msg: 'Article created',
                        data: newArticle
                    })
                })
                .catch(error =>{
                    res.status(500).json({
                       msg: 'ERROR Get User after Create article ',error 
                    })
                })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Create Article ',error
              })
          })
    }

}

module.exports = ArticleController