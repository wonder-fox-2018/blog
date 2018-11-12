const route = require('express').Router()
const isLogin = require('../middlewares/isLogin')
const ArticleController = require('../controllers/controllerArticle')
const GCSUploader = require('../helpers/GCSUploader')

route
  .get('/category/:id', ArticleController.getArticleByCategory)
  .get('/search/:title', ArticleController.getArticleByTitle)
  .get('/me', isLogin, ArticleController.getMyArticle)
  .get('/:id', ArticleController.getSpesificArticle)
  .get('/', ArticleController.getAllArticle)
  .post('/', isLogin, GCSUploader.multer.single('image'),
    GCSUploader.sendUploadToGCS, ArticleController.createArticle)
  .put('/:id', isLogin, ArticleController.updateArticle)
  .delete('/:id', isLogin, ArticleController.deleteArticle)

module.exports = route
