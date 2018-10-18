var express = require('express');
var router = express.Router();
var ArticleController = require('../controllers/ArticleController.js');

// /articles

router.get('/', ArticleController.list);
router.get('/:id', ArticleController.show);
router.post('/', ArticleController.create);
router.put('/:id', ArticleController.update);
router.delete('/:id', ArticleController.remove);

module.exports = router;
