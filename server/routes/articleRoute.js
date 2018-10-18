const route = require('express').Router()
const isLogin = require('../middlewares/isLogin')
const ArticleController = require('../controllers/controllerArticle')

route
  .get('/:id', ArticleController.getSpesificArticle)
  .get('/', ArticleController.getAllArticle)
  .post('/', isLogin, ArticleController.createArticle)
  .put('/:id', isLogin, ArticleController.updateArticle)
  .delete('/:id', isLogin, ArticleController.deleteArticle)

module.exports = route