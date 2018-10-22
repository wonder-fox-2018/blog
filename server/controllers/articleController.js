const Article = require('../models/article');
const ServerResponse = require('../helpers/serverResponse');

module.exports = {
    create: (req, res) => {
       
        let newArticle = new Article({
            title: req.body.title,
            author: req.decoded.id,
            content: req.body.content
        });

        newArticle.save()
            .then((result) => {
                res.status(201).json(result);
            }).catch((err) => {
                ServerResponse.error(res, 400, 'invalid input');
            });
    },

    showAll: (req, res) => {
        Article.find().populate('author', '_id first_name last_name').exec().then((article) => {
            res.status(200).json(article);
        }).catch((err) => {
            ServerResponse.error(res, 500, 'server is down');
        });
    },

    update: (req, res) => {
        Article.findOne({_id: req.params.id, author: req.decoded.id}).then((article) => {
            if (article) {
                
                article.title = req.body.title;
                article.content = req.body.content;

                article.save().then((article) => {
                    res.status(200).json(article);
                }).catch((err) => {
                    res.status(400).json(err.message);
                });
            } else {
                ServerResponse.error(res, 401, 'user is not authorized');
            }
        }).catch((err) => {
            res.status(500).json(err.message);
        });
     
    },

    delete: (req, res) => {
        Article.deleteOne({_id: req.params.id, author: req.decoded.id}).then((result) => {
                res.status(200).json(result);
        }).catch((err) => {
            ServerResponse.error(res, 401, 'user is not authorized to delete this article')
        });
    },

    showUserArticle: (req, res) => {
        
        Article.find({author: req.decoded.id}).then((article) => {
            res.status(200).json(article);
        }).catch((err) => {
            ServerResponse.error(res, 500, 'server is down');
        });
    },

    findById: (req, res) => {
        Article.findById(req.params.id).populate('author', '_id first_name last_name').then((article) => {
            res.status(200).json(article);
        }).catch((err) => {
            res.status(500).json(err.message);
        });
    },

    findByKeyword: (req, res) => {
        Article.find( { $or: [{title: new RegExp(req.params.keyword, 'i')}, {content: new RegExp(req.params.keyword, 'i')}]}).then((result) => {
            console.log(result);
            res.status(200).json(result);
        }).catch((err) => {
            
            res.status(500).json(err);
        });
    }

};
