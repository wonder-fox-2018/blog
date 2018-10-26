var express = require('express');
var router = express.Router();
const userRoute = require('./users')
const articleRoute = require('./article')
const commentRoute = require('./comment')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Project Blog');
});


router.use('/users', userRoute)
router.use('/articles', articleRoute)
router.use('/comments', commentRoute)

module.exports = router;
