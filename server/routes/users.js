const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.get('/',userController.read)
router.get('/:id',userController.readOne)
router.put('/:id',userController.update)


module.exports = router