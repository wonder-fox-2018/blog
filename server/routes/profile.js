var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const Middlewares = require('../middlewares/index');
const ArticleController = require('../controllers/articleController');

router.use(Middlewares.isLogin);

router.get('/', UserController.getUserProfile);

router.get('/user-article', ArticleController.showUserArticle);

module.exports = router;