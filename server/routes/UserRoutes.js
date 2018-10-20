const router = require('express').Router()
const UserController = require('../controllers/UserController.js')

// /users/

router.get('/:id',UserController.findOneById)
router.get('/verify/:token',UserController.verify)
router.put('/:id',UserController.update)
module.exports = router