const router = require('express').Router()
const commentController = require('../controllers/commentController')
const middleware = require('../middleware/middleware')

router.post('/:id',middleware.authenticate,commentController.create)
router.delete('/:id',middleware.authenticate,commentController.delete)

// router.get('/',commentController.read)
// router.get('/:id',commentController.readOne)

module.exports = router;