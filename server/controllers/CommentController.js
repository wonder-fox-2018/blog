'use strict'

const Commentary = require('../models/comment')
const Article = require('../models/article')

class CommentController{
    // create comment
    static createComment(req,res){
        Commentary.create({
            content: req.body.content,
            articleid: req.body.articleid,
            userid: req.decoded.userid,
            comentator: req.decoded.name
        })
          .then(comment =>{
             let newComment = comment
             // update article
             Article.findOneAndUpdate({
                 _id: newComment.articleid
             },{
                 $push: {
                     listcomments: newComment._id
                 }
             })
               .then(article =>{
                   res.status(201).json({
                       msg: `Comment for article ${article.title} has been created`,
                       data: newComment
                   }) 
               })
               .catch(error =>{
                   res.status(500).json({
                       msg: 'ERROR Updating articles after comment ',error
                   })
               })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Create Comment ',error
              })
          })
    }

    // get lists of all comments
    static getListComments(req,res){
        Commentary.find({})
          .then(comments =>{
              res.status(200).json({
                  msg: 'List of comments',
                  data: comments
              })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Get list of comments'
              })
          })
    }

    // delete comment 
    static deleteComment(req,res){
        
        Commentary.findOne({
            _id: req.params.id
        })
          .then(comment =>{
              let deleteComment = comment
              // check user 
              if(deleteComment.userid == req.decoded.userid){
                // Update article
                Article.findOneAndUpdate({
                    _id: deleteComment.articleid
                },{
                    $pull: {
                        listcomments: deleteComment._id
                    }
                })
                 .then(article =>{
                    // delete comment
                    Commentary.findOneAndRemove({ _id: req.params.id})
                      .then(deletedComment =>{  
                          res.status(201).json({
                              msg: 'Comment Deleted',
                              data: deletedComment
                          })
                      })
                      .catch(error =>{
                          res.status(500).json({
                              msg: 'ERROR Delete Comment'
                          })
                      })
                 }) 
                 .catch(error =>{
                     res.status(500).json({
                         msg: 'ERROR Update Article when delete comment ',error
                     })
                 })
              }else if(deleteComment.userid != req.decoded.userid){
                  res.status(403).json({
                      msg: 'User is not authorized to delete comment'
                  })
              }
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Delete Comment ',error
              })
          })
    }
}

module.exports = CommentController