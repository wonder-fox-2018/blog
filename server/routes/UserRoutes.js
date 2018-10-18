const router = require('express').Router()
const UserController = require('../controllers/UserController.js')

// /users/

router.get('/:id',UserController.findOneById)
router.get('/verify/:token',UserController.verify)
module.exports = router