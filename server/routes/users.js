const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const {article} = require('../middleware/isHim')

const userController = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Index user');
});

router.get('/profile',auth,userController.fetch)

router.put('/',auth,userController.update)
router.post('/', userController.create)

router.post('/login', userController.login)

module.exports = router;