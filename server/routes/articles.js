'use strict'

const router = require('express').Router();
const {articleCreate,articleSearch,articleReadByAuthor, articleReadAll, articleReadById, articleUpdate, articleDelete} = require('../controllers/articles.controller');
const {isLogin} = require('../middlewares/isLogin');
const helpers = require('../helpers/images')

router.get('/', articleReadAll);
router.post('/', isLogin, helpers.multer.single('imagefile'), helpers.sendUploadToGCS, articleCreate);
router.post('/byid', articleReadById);
router.put('/', isLogin,  helpers.multer.single('imagefile'), helpers.sendUploadToGCS, articleUpdate);
router.delete('/', isLogin, articleDelete);
router.post('/search',isLogin,  articleSearch);
router.get('/byauthor',isLogin,  articleReadByAuthor);
// router.get('/:id', articleReadById);



module.exports = router;