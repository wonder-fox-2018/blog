'use strict'

const Crypto = require('crypto')

function hashPassword(input){

    const hash = Crypto.createHmac('sha256', process.env.SECRET)
                   .update(input)
                   .digest('hex');

    return hash               
}

module.exports = hashPassword