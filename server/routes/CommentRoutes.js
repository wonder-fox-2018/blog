var express = require('express');
var router = express.Router();
var CommentController = require('../controllers/CommentController.js');

router.get('/:articleId', CommentController.list)
router.post('/:articleId', CommentController.create);
router.delete('/:id', CommentController.remove);

module.exports = router;
