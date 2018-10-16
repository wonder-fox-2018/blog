'use strict'

const router = require('express').Router();
const {articleCreate, articleReadAll, articleReadByAuthor, articleReadById, articleUpdate, articleDelete} = require('../controllers/articles.controller');
const {isLogin} = require('../middlewares/isLogin');

router.get('/', articleReadAll)
// router.get('/', verify, articleReadByAuthor);
router.post('/', isLogin, articleCreate);
router.put('/', isLogin, articleUpdate);
router.delete('/', isLogin, articleDelete);
router.get('/:id', articleReadById);

module.exports = router;