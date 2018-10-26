require('dotenv').config();
const crypto = require('crypto');

function encryptPassword(password) {
    const secret = process.env.SECRET_KEY;
    const hash = crypto.createHmac('sha256', secret)
                        .update(password)
                        .digest('hex');
                     
    password = hash;
    
    return password;
}

module.exports = encryptPassword;