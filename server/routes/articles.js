var express = require('express');
var router = express.Router();
const {add, find, del, getAll} = require('../controllers/articles')
const {isLogin} = require('../middlewares/index')

router.post('/', isLogin, add)
router.get('/', getAll)
router.get('/:id', find) 
router.delete('/', isLogin, del)

module.exports = router;
