var ArticleModel = require('../models/ArticleModel.js');

module.exports = {

    list: function (req, res) {
        ArticleModel.find().populate('author comments').sort('-createdAt').exec()
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

    search: function (req, res) {
        ArticleModel.find({
                $or: [{
                        title: new RegExp(req.body.searchinput, 'i')
                    },
                ]
            })
            .populate('author comments').sort('-createdAt').exec()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    },

    update: function (req, res) {
        console.log('masuk udate');
        res.json({message : 'under construction'})
    },

    remove: function (req, res) {
        var id = req.params.id;
        ArticleModel.findByIdAndDelete(id, function (err, Article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Article.',
                    error: err
                });
            }
            return res.status(204).json({
                message : 'Delete article success'
            });
        });
    }
};