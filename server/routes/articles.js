'use strict'

const router = require('express').Router();
const {articleCreate,articleSearch,articleReadByAuthor, articleReadAll, articleReadById, articleUpdate, articleDelete} = require('../controllers/articles.controller');
const {isLogin} = require('../middlewares/isLogin');

router.get('/', articleReadAll);
router.post('/', isLogin, articleCreate);
router.post('/byid', articleReadById);
router.put('/', isLogin, articleUpdate);
router.delete('/', isLogin, articleDelete);
router.post('/search',isLogin,  articleSearch);
router.get('/byauthor',isLogin,  articleReadByAuthor);
// router.get('/:id', articleReadById);



module.exports = router;