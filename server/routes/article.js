const midleware = require('../midleware/auth')
const router = require('express').Router()
const articleController = require('../controllers/articleController')

router.get('/', (req, res) => {
    res.send('Article Route')
})

router.get('/show/:id',articleController.showArticleById)
router.get('/show', articleController.showAllArticle)
router.get('/show/myarticle', articleController.showAllArticle)
router.get('/myarticle',midleware.isLogin, articleController.showUserArticle)
router.get('/search/:keyword', articleController.searchArticle)
router.post('/add',midleware.isLogin, midleware.isYou ,articleController.createArticle)
router.put('/update/:id',midleware.isLogin, articleController.updateArticle)
router.delete('/delete/:id',midleware.isLogin,midleware.isYou, articleController.deleteArticle)

module.exports = router

