const express = require('express'),
    router = express.Router(),
    { isLogin, authdulu } = require("../middlewares/auth"),
    { list, insert, remove, update, getMyArticle, getArticleById } = require('../controllers/articles');

/* GET articles listing. */
router
    .get('/', list)

    .get('/personal', isLogin, getMyArticle)
    
    .post('/', isLogin, insert)
    
    .get('/:id', getArticleById)

    .put('/:id', isLogin, authdulu, update)

    .delete('/:id', isLogin, authdulu, remove)

module.exports = router;
