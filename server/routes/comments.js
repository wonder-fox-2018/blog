const express = require('express'),
    router = express.Router(),
    { isLogin, authdulu } = require("../middlewares/auth"),
    { list, insert, remove, findById } = require('../controllers/comments');

/* GET articles listing. */
router
    .get('/:comid', findById)

    .get('/:artid', list)

    .post('/:artid', isLogin, authdulu, insert)

    .delete('/:id', isLogin, authdulu, remove)

module.exports = router;
