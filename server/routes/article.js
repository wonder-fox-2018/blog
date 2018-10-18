var express = require('express');
var router = express.Router();
const ArticleController = require('../controllers/articleController');
const Middlewares = require('../middlewares/index');

router.get('/', ArticleController.showAll);

router.use(Middlewares.isLogin);

router.get('/:id', ArticleController.showUserArticle);

router.post('/', ArticleController.create);

router.patch('/:id', ArticleController.update);

module.exports = router;