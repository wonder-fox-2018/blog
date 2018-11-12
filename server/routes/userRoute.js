const route = require('express').Router()
const isLogin = require('../middlewares/isLogin')
const UserController = require('../controllers/controllerUser')
const GCSUploader = require('../helpers/GCSUploader')

route
  .post('/avatar', isLogin, GCSUploader.multer.single('image'),
    GCSUploader.sendUploadToGCS, UserController.changeAvatar)
  .post('/register', UserController.register)
  .post('/login', UserController.login)
  .get('/verify', UserController.verifyEmail)
  .get('/', isLogin, UserController.getUserData)

module.exports = route
