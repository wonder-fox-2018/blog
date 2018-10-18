const Article = require('../models/articleModel.js');

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
                res.status(500).json(err);
            });
    }

    static showAll(req, res) {
        Article.find()
            .then(function(articles) {
                res.status(200).json(articles);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static findWithId(req, res) {
        Article.findById(req.params.id)
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
        Article.deleteOne({_id: req.params.id})
            .then(function(result) {
                const response = {
                    success: true,
                    message: `Article successfully deleted`
                };
                res.status(200).json(response);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }
}

module.exports = ArticleController;