var express = require('express');
var router = express.Router();
const {add, find, del, getAll, edit, search, myArticles} = require('../controllers/articles')
const {isLogin, isSelf} = require('../middlewares/index')

router.post('/', isLogin, add)
router.get('/', getAll)
router.get('/my', isLogin, myArticles)
router.get('/:id', find) 
router.put('/:id', isLogin, isSelf, edit)
router.delete('/:id', isLogin, isSelf, del)
router.get('/search/:q', search)



module.exports = router;
