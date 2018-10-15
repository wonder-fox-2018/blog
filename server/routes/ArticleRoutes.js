'use strict'

const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, ArticleController.createArticle)
      .put('/:id', isLogin, ArticleController.editArticle)

module.exports = router