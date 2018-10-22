const Comment = require('../models/comment')
const Article = require('../models/article')

module.exports = {
    add: (req, res) => {
        Comment.create({
            comment: req.body.comment,
            user: req.decoded.id
        })
        .then((data) => {
            Article.updateOne({
                _id: req.body.articleId
            }, {
                $push: {
                    comments: data._id
                }
            })
            .then((result) => {
                res.status(201).json(result)
            })
        }).catch((err) => {
            res.status(500).json(err)          
        });

    },
    del: (req, res) => {
        Comment.deleteOne({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)          
        });
    }




}