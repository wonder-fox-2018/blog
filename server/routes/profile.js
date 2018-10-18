var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const Middlewares = require('../middlewares/index');

router.use(Middlewares.isLogin);

router.get('/', UserController.getUserProfile);

module.exports = router;