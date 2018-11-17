'use strict'

const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const isLogin = require('../middlewares/isLogin')

router.get('/details', isLogin, UserController.getDetailUser)
      .get('/credentials', isLogin, UserController.getCredentials)

module.exports = router