'use strict'

const jwt = require('jsonwebtoken');
const Article = require('../models/Article');
const User = require('../models/UserModel');

module.exports = {
    articleReadAll: (req, res) => {
        Article
            .find()
            .exec()
            .then((response) => {
                res.status(200).json({
                    articles:response
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },

    articleReadByAuthor: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);        
        Article
            .find({author: decoded.id})
            .populate('author')
            .exec()
            .then((response) => {
                res.status(200).json({
                    articles:response
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },

    articleReadById: (req, res) => {
        // let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);        
        Article
            .findById(req.params.id)
            .populate('author')
            .exec()
            .then((response) => {
                res.status(200).json({
                    article:response
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },

    articleCreate: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);        
        let newArticle = new Article({
            title: req.body.title,
            description: req.body.description,
            author: decoded.id
        });
        newArticle
            .save()
            .then((response) => {
                res.status(201).json({
                    message: 'Article Successfully Created',
                    articles: response                    
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error Creating Article!!',
                    err
                });
            })
        
    },

    articleUpdate: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);        
        Article
            .findById(req.headers.articleid)
            .then((article) => {
                if(article.author == decoded.id) {
                    let updateValue = {
                        title: req.body.title || article.title,
                        description: req.body.description || article.description,
                        author: req.body.author || article.author
                    }
                    Article
                        .update(
                            { _id: article._id},
                            {$set: updateValue}
                        )
                        .then((response) => {
                            return res.status(200).json({
                                message: "Article Successfully Updated",
                                articles: response
                            })
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message: 'Error!!',
                                err
                            });
                        })
                } else {
                    reject();
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error!!',
                    err
                });
            })
    },

    articleDelete: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        Article
            .findById(req.headers.articleid)
            .then((article) => {
                if(article.author == decoded.id) {
                    Article
                        .remove({_id: req.headers.articleid})
                        .then((response) => {
                            res.status(200).json({
                                message: 'Article deleted',
                                response
                            })
                        })
                        .catch((err) => {
                            res.status(500).send(err)
                        })
                } else {
                    reject();
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error!!',
                    err
                });
            });
    }
}