const Article = require('../models/article')
const User = require('../models/user')

class ArticleController{
    static createArticle(req, res){
        Article.create({
            title : req.body.title,
            article : req.body.article,
            user : req.login.id
        })
        .then(article => {
            res.status(201).json({
                article,
                message : "Create article success"
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static updateArticle(req, res){
        Article.findOne({
            _id : req.params.id,
            user : req.login.id
        })
        .then(article => {
            if(article){
                article.title = req.body.title,
                article.article = req.body.article
                article.save()
                .then(updated => {
                    res.status(200).json(updated)
                })
            }
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }
    static deleteArticle(req, res){
        Article.findOneAndDelete({ _id : req.params.id})
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static showAllArticle(req, res){
        Article.find({})
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json(err)
        })
        
    }
}

module.exports = ArticleController