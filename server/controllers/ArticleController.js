'use strict'

const Article = require('../models/article')
const User = require('../models/user')
const Commentary = require('../models/comment')

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

    // edit article
    static editArticle(req,res){
        Article.findOneAndUpdate({
            _id: req.params.id
        },{
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        })
          .then(updatedarticle => {
              res.status(201).json({
                 msg: 'Article updated',
                 data: updatedarticle
              })
          })
          .catch(error => {
            res.status(500).json({
                msg: 'ERROR Update Article ',error
            })
          })
    }

    // show lists of articles
    static getListArticles(req,res){
        Article.find({}).populate('author').populate('listcomments')
         .then(articles =>{
            res.status(200).json({
                msg: 'List of articles',
                data: articles
            })
         })
         .catch(error =>{
             res.status(500).json({
                msg: 'ERROR Get list of articles' 
             })
         })
    }

    // show detail of articles
    static getDetails(req,res){
        Article.findOne({ _id: req.params.id})
        .populate('author').populate('listcomments')
         .then(article=>{
            res.status(200).json({
                msg: `Details of article ${article.title}`,
                data: article
            })
         })
         .catch(error =>{
             res.status(500).json({
                 msg: 'ERROR get detail of article ',error
             })
         })
    }

    // delete article
    static deleteArticle(req,res){
        Article.findOne({
            _id: req.params.id
        })
          .then(article =>{
              let deleteArticle = article

              // Update user data
              User.findOneAndUpdate({
                _id: req.decoded.userid
            },{
                $pull: {
                    articleslist: deleteArticle._id
                }
            })
             .then(user=>{

                // update comment collections --> 
                // delete all comments related to this article
                Commentary.deleteMany({
                    articleid: deleteArticle._id
                })
                  .then(commentupdated =>{
                      // completely remove article
                      Article.findOneAndRemove({
                          _id: req.params.id
                      })
                        .then(deletedArticle =>{
                          res.status(201).json({
                              msg: 'Article Deleted',
                              data: deletedArticle
                          })
                        })
                        .catch(error =>{
                            res.status(500).json({
                                msg: 'ERROR Delete Article ',error
                            })
                        })  
                  })
                  .catch(error =>{
                      res.status(500).json({
                         msg:'ERROR Update Comment while delete article' 
                      })
                  })
             })
             .catch(error =>{
                 res.status(500).json({
                     msg: 'ERROR Update User data when delete article',error
                 })
             })  
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Get article before delete ',error
              })
          })
    }

    // search article
    static searchArticleByName(req,res) {
        Article.find({}).populate('author').populate('listcomments')
         .then(articles => {
            let regex = new RegExp(`${req.body.keyword}`,'i')
            let sortedArr = []
            articles.forEach(article =>{
                if(regex.test(article.title)){
                    sortedArr.push(article)
                }
            })
            res.status(200).json({
                msg: 'List of article by keyword',
                data: sortedArr 
             })
         })
         .catch(error => {
            res.status(500).json({
                msg: 'ERROR Get article by keyword ',error
            }) 
         })
    }

}

module.exports = ArticleController