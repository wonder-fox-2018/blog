const router = require('express').Router();
const UserController = require('../controllers/userController.js');
const images = require('../helpers/images');

router.get('/', function(req, res) {
    res.send('Blog Home');
});

router.post('/register', UserController.register);
router.post('/uploadavatar',
    images.multer.single('image'), 
    images.sendUploadToGCS,
    (req, res) => {
        res.send({
        status: 200,
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
})

router.post('/login', UserController.login);

module.exports = router;