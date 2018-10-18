var express = require('express');
var router = express.Router();
var {add, update, login, getUser} = require('../controllers/users')

router.get('/', getUser)
router.post('/', add)
router.post('/login', login)
router.put('/:id', update)

module.exports = router;