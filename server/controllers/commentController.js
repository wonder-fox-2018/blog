const Comment = require('../models/comment');

module.exports = {
    create: (req, res) => {
        Comment.create({
            content: req.body.content,
            user: req.decoded.id,
            article: req.params.id
        }).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    },

    showAll: (req, res) => {
        Comment.find({article: req.params.id}).populate('user', '_id first_name last_name').then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    },

    delete: (req, res) => {
        Comment.deleteOne({article: req.params.id, user: req.decoded.id, _id: req.body.id}).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.json(err.message);
        });
    }
};
