const express = require('express'),
    router = express.Router(),
    { list, insert, update, remove, register, login } = require('../controllers/users');

/* GET users listing. */
router
    .get('/', list)
    
    .post('/', insert)

    .put('/:id', update)
    
    .delete('/:id', remove)
    
    .post('/register', register)
    
    .post('/login', login)

module.exports = router;
