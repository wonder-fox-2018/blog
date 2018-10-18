const express = require('express'),
    router = express.Router(),
    { isSelf } = require("../middlewares/auth");

/* GET articles listing. */
router

    // .get('/self', isSelf)

module.exports = router;
