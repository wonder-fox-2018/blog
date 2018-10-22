const router = require('express').Router()
const articleController = require('../controllers/articleController')
const middleware = require('../middleware/middleware')
const images = require('../helpers/images')


router.get('/my',middleware.authenticate,articleController.my)
router.post('/create',middleware.authenticate,articleController.create)
router.get('/',articleController.read)
router.get('/search',articleController.search)
router.get('/:id',articleController.readOne)
router.put('/:id',middleware.authenticate,articleController.update)
router.delete('/:id',middleware.authenticate,articleController.delete)

router.get('/bycategory/:id',articleController.byCategory)


router.post('/upload',
    images.multer.single('image'), 
    images.sendUploadToGCS,
    (req, res) => {
        res.send({
        status: 200,
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
})

module.exports = router