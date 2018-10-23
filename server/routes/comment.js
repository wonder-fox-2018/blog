const router = require('express').Router()
const commentController = require('../controllers/commentController')
const midleware = require('../midleware/auth')

router.get('/', (req, res)=> {
    res.send('Comment Route')
})


router.get('/showall', commentController.showAllComment)
router.post('/add',midleware.isLogin, commentController.createComment)
router.put('/edit/:id', commentController.updateComment)
router.delete('/delete/:id',midleware.isLogin, midleware.isAdmin, commentController.deleteComment)

module.exports = router