const express = require('express'),
    router = express.Router(),
    { isLogin } = require("../middlewares/auth"),
    { list, insert, remove, update, getMyArticle, getArticleById } = require('../controllers/articles');

/* GET articles listing. */
router
    .get('/', list)

    .get('/personal', isLogin, getMyArticle)
    
    .post('/', isLogin, insert)
    
    .get('/:id', getArticleById)

    .put('/:id', isLogin, update)

    .delete('/:id', isLogin, remove)

module.exports = router;
