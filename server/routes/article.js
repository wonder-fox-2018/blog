const router = require('express').Router()
const articleController = require('../controllers/articleController')
const middleware = require('../middleware/middleware')

router.post('/create',middleware.authenticate,articleController.create)
router.get('/',articleController.read)
router.get('/search',articleController.search)
router.get('/:id',articleController.readOne)

module.exports = router