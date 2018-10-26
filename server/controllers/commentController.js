const Comment = require('../models/comment')
const Article = require('../models/article')

class CommentController{
    static createComment(req, res){
       Comment.create({
           comment : req.body.comment,
           user : req.login.username
       })
       .then(comment => {
            Article.findByIdAndUpdate(req.body.articleId, {
                $push : {
                    comments : comment._id
                }
            }).populate('comments')
            .then(article => {
                res.status(200).json(article)
            })
       })
       .catch(err => {
           console.log(err)
       })
    }
    static updateComment(req, res){
        
    }
    static deleteComment(req, res){
        Comment.findByIdAndDelete({
            _id : req.params.id
        })
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static showAllComment(req, res){
        Comment.find().populate('user', '_id username')
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(err => {
            res.status(500).json(err)
        })
        
    }

}
module.exports = CommentController
