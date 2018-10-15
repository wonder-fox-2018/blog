'use strict'

const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const isLogin = require('../middlewares/isLogin')

router.get('/lists',CommentController.getListComments)
      .post('/',isLogin,CommentController.createComment)
      .delete('/:id', isLogin, CommentController.deleteComment)

module.exports = router