'use strict'

const router = require('express').Router();
const {userCreate, userReadById, userUpdate, userDelete} = require('../controllers/users.controller');
const {isLogin} = require('../middlewares/isLogin');

router.get('/', isLogin, userReadById);
router.post('/', userCreate);
router.put('/', isLogin, userUpdate);
router.delete('/', isLogin, userDelete);

module.exports = router;