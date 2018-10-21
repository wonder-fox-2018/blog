const Article = require('../models/article')
const User = require('../models/user')
const mongoose = require('mongoose')

class ArticleController{
    static createArticle(req, res){
        Article.create({
            title : req.body.title,
            article : req.body.article,
            category : req.body.category,
            img : req.body.img,
            username : req.login.username,
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
                    res.status(200).json({
                        updated,
                        message : 'Article updated'
                    })
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
    static showArticleById(req, res){
        Article.findOne({
            _id : req.params.id
        })
        .populate('comments')
        .then(article => {
            res.status(200).json({article})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static searchArticle(req, res){
        Article.find({
            title: new RegExp(req.params.keyword, 'i')
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    }
    static showUserArticle(req, res){
        const userId = new mongoose.Types.ObjectId(req.login.id);
        Article.find({}).populate('user')
        .then(article => {
            const result = article.filter(function (datum) {
                return userId.equals(datum.user._id);
            });
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    }
}

module.exports = ArticleController