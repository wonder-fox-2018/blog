var CommentModel = require('../models/CommentModel.js');

module.exports = {

    list: function (req, res) {
        CommentModel.find({article : req.params.articleId}).populate('user')
        .then((result) => {
            return res.json(result);
        }).catch((err) => {
            return res.status(500).json({
                message: 'Error when getting Comment.',
                error: err
            });
        });
    },

    create: function (req, res) {
        var Comment = new CommentModel({
			user : req.body.user,
			article : req.params.articleId,
			comment : req.body.comment
        });

        Comment.save(function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Comment',
                    error: err
                });
            }
            return res.status(201).json(Comment);
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        CommentModel.findByIdAndRemove(id, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Comment.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
