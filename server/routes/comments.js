const express = require('express'),
    router = express.Router(),
    { isLogin } = require("../middlewares/auth"),
    { list, insert, remove, findById } = require('../controllers/comments');

/* GET articles listing. */
router
    .get('/:comid', findById)

    .get('/:artid', list)

    .post('/:artid', isLogin, insert)

    .delete('/:id', isLogin, remove)

module.exports = router;
