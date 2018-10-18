const route = require('express').Router()
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')
const CategoryController = require('../controllers/controllerCategory')

route
  .post('/', isLogin, isAdmin, CategoryController.createCategory)

module.exports = route
