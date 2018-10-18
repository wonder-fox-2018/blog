const router = require('express').Router()
const articleController = require('../controllers/articleController')
const middleware = require('../middleware/middleware')

router.post('/create',middleware.authenticate,articleController.create)
router.get('/',articleController.read)
router.get('/search',articleController.search)
router.get('/:id',articleController.readOne)
router.put('/:id',middleware.authenticate,articleController.update)
router.delete('/:id',middleware.authenticate,articleController.delete)

module.exports = router