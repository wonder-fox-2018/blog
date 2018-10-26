'use strict'

const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')
const isLogin = require('../middlewares/isLogin')
const isAuthorizedArticle = require('../middlewares/isAuthorizedArticle')

router.get('/lists', ArticleController.getListArticles)
      .post('/search', ArticleController.searchArticleByName)
      .post('/', isLogin, ArticleController.createArticle)
      .get('/:id', ArticleController.getDetails)
      .put('/:id', isLogin, isAuthorizedArticle, ArticleController.editArticle)
      .delete('/:id', isLogin, isAuthorizedArticle ,ArticleController.deleteArticle)

module.exports = router