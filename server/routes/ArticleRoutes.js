'use strict'

const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')
const isLogin = require('../middlewares/isLogin')

router.get('/lists', ArticleController.getListArticles)
      .post('/', isLogin, ArticleController.createArticle)
      .get('/:id', ArticleController.getDetails)
      .put('/:id', isLogin, ArticleController.editArticle)
      .delete('/:id', isLogin,ArticleController.deleteArticle)

module.exports = router