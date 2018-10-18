const route = require('express').Router()
const isLogin = require('../middlewares/isLogin')
const UserController = require('../controllers/controllerUser')

route
  .post('/register', UserController.register)
  .post('/login', UserController.login)
  .get('/', isLogin, UserController.getUserData)

module.exports = route