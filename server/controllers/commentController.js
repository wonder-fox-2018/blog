const Comment = require('../models/commentModel.js');

class CommentController {
    static create(req, res) {
        Comment.create({
            content: req.body.content,
            article: req.params.id,
            user: req.user._id
        })
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static showAll(req, res) {
        Comment.find({article: req.params.id}).populate('user', '_id name email')
            .then(function(comments) {
                res.status(200).json(comments);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Comment.deleteOne({article: req.params.id, user: req.user._id, _id: req.body.id})
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }
}

module.exports = CommentController;