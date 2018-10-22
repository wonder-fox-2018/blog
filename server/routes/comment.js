const CommentController = require('../controllers/commentController');
const Middlewares = require('../middlewares/index');
var express = require('express');
var router = express.Router();

router.use(Middlewares.isLogin);

router.get('/:id', CommentController.showAll);

router.post('/:id', CommentController.create);

router.delete('/:id', CommentController.delete);


module.exports = router;



