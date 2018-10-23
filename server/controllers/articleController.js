const Article = require('../models/articleModel.js');
const Comment = require('../models/commentModel.js');
const mongoose = require('mongoose');

class ArticleController {
    static create(req, res) {
        let article = new Article({
            title: req.body.title,
            description: req.body.description,
            author: req.user._id
        });
        article.save()
            .then(function(article) {
                const response = {
                    success: true,
                    message: `Article ${article.title} created`,
                    article: article
                };
                res.status(201).json(response);
            })
            .catch(function(err) {
                console.log(err)
                res.status(500).json(err);
            });
    }

    static showAll(req, res) {
        Article.find().populate('author')
            .then(function(articles) {
                res.status(200).json(articles);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static findWithId(req, res) {
        Article.findById(req.params.id).populate('author')
            .then(function(article) {
                res.status(200).json(article);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }
    
    static update(req, res) {
        Article.findOne({_id: req.params.id})
            .then(function(article) {
                if (article) {
                    article.title = req.body.title;
                    article.description = req.body.description;

                    article.save()
                        .then(function(result) {
                            const response = {
                                success: true,
                                message: `Article successfully updated`
                            };
                            res.status(200).json(response);
                        })
                        .catch(function(err) {
                            res.status(500).json(err);
                        });
                } else {
                    res.status(500).json({
                        message: 'Error: Article not found'
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Article.deleteOne({_id: req.params.id, author: req.user._id})
            .then(function(result) {
                Comment.deleteMany({article: req.params.id})
                    .then(function(resultComment) {                        
                        const response = {
                            success: true,
                            message: `Article successfully deleted`
                        };
                        res.status(200).json(response);
                    })
                    .catch(function(err) {
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static findByAuthor(req, res) {
        const userId = new mongoose.Types.ObjectId(req.user._id)
        Article.find().populate('author')
            .then(function(articles) {
                const result = articles.filter(function(datum) {
                    return userId.equals(datum.author._id);
                });
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static searchArticle(req, res) {
        Article.find({name: new RegExp(req.params.keyword, 'i')})
            .then(function(articles) {
                res.status(200).json(articles);
            })
            .catch(function(err) {
                res.status(500).json(err.message); 
            });
    }
}

module.exports = ArticleController;