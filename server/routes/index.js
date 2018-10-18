var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController.js')

router.get('/',(req,res)=>{res.status(200)})

router.post('/register',UserController.register)
router.post('/login',UserController.login)

router.use('/users',require('./UserRoutes.js'))
router.use('/articles',require('./ArticleRoutes.js'))

module.exports = router;
