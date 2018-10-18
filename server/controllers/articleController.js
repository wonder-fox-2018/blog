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
                    
                    ServerResponse.success(res, 200, 'article has been updated', {article});
                }).catch((err) => {
                    ServerResponse.error(res, 400, 'invalid input');
                });
            } else {
                ServerResponse.error(res, 401, 'user is not authorized');
            }
        }).catch((err) => {
            res.status(500).json(err);
        });
     
    },

    delete: (req, res) => {
        Article.deleteOne({_id: req.params.id, author: req.decoded.id}).then((result) => {
            ServerResponse.success(res, 200, 'article has been deleted', result);
        }).catch((err) => {
            ServerResponse.error(res, 401, 'user is not authorized to delete this article')
        });
    },

    showUserArticle: (req, res) => {
        Article.find({author: req.params.id}).then((article) => {
            res.status(200).json(article);
        }).catch((err) => {
            ServerResponse.error(res, 500, 'server is down');
        });
    }

};
