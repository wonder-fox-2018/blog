var express = require('express');
var router = express.Router();
const ArticleController = require('../controllers/articleController');
const Middlewares = require('../middlewares/index');

router.get('/', ArticleController.showAll);

router.get('/:id', ArticleController.findById);

router.use(Middlewares.isLogin);



router.delete('/:id', ArticleController.delete);

router.post('/', ArticleController.create);

router.patch('/:id', ArticleController.update);

module.exports = router;