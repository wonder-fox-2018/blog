const commentRouter = require('express').Router();
const CommentController = require('../controllers/commentController.js');
const isLogin = require('../middlewares/isLogin.js');

commentRouter.get('/:id', isLogin, CommentController.showAll);
commentRouter.post('/:id', isLogin, CommentController.create);
commentRouter.delete('/:id', isLogin, CommentController.delete);

module.exports = commentRouter;