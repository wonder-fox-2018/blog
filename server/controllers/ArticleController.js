var ArticleModel = require('../models/ArticleModel.js');

module.exports = {

    list: function (req, res) {
        ArticleModel.find()
            .then((Articles) => {
                return res.json(Articles);
            }).catch((err) => {
                return res.status(500).json({
                    message: 'Error when getting Article.',
                    error: err
                });
            });
    },

    show: function (req, res) {
        var id = req.params.id;
        ArticleModel.findOne({
            _id: id
        }, function (err, Article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Article.',
                    error: err
                });
            }
            if (!Article) {
                return res.status(404).json({
                    message: 'No such Article'
                });
            }
            return res.json(Article);
        });
    },

    create: function (req, res) {
    
        var Article = new ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author, // ambil dari localstorage
            comments: []

        });
        
        Article.save(function (err, Article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Article',
                    error: err
                });
            }
            return res.status(201).json(Article);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        ArticleModel.findOne({
            _id: id
        }, function (err, Article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Article',
                    error: err
                });
            }
            if (!Article) {
                return res.status(404).json({
                    message: 'No such Article'
                });
            }

            Article.title = req.body.title ? req.body.title : Article.title;
            Article.content = req.body.content ? req.body.content : Article.content;
            Article.author = req.body.author ? req.body.author : Article.author;
            Article.comments = req.body.comments ? req.body.comments : Article.comments;

            Article.save(function (err, Article) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Article.',
                        error: err
                    });
                }

                return res.json(Article);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        ArticleModel.findByIdAndRemove(id, function (err, Article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Article.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};