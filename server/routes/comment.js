const router = require('express').Router()
const commentController = require('../controllers/commentController')

router.post('/create',commentController.create)
router.get('/',commentController.read)

module.exports = router;