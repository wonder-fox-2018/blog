var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const Middlewares = require('../middlewares/index');
const articleRoute = require('./article');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'home'
  })
});

router.post('/register', UserController.create);

router.post('/login', UserController.login);


router.use('/article', articleRoute);





module.exports = router;
