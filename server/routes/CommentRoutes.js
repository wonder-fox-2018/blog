'use strict'

const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const isLogin = require('../middlewares/isLogin')
const isAuthorizedComment = require('../middlewares/isAuthorizedComment')

router.get('/lists',CommentController.getListComments)
      .post('/',isLogin,CommentController.createComment)
      .delete('/:id', isLogin, isAuthorizedComment ,CommentController.deleteComment)

module.exports = router