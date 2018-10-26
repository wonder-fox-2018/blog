const articleRouter = require('express').Router();
const ArticleController = require('../controllers/articleController.js');
const isLogin = require('../middlewares/isLogin.js');

articleRouter.get('/', ArticleController.showAll);
articleRouter.get('/:id', ArticleController.findWithId);
articleRouter.post('/create', isLogin, ArticleController.create);
articleRouter.put('/:id', isLogin, ArticleController.update);
articleRouter.delete('/:id', isLogin, ArticleController.delete);
articleRouter.get('/ownsarticle/user', isLogin, ArticleController.findByAuthor);
articleRouter.get('/search/:keyword', ArticleController.searchArticle);

module.exports = articleRouter;