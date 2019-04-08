'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const saltRounds = 10;

module.exports = mongoose.model('User', schema({
    first_name: String,
    last_name: String,
    email: { 
        type:String,
        unique: true,
        required: true
    },
    password: { 
        type:String,
        required: true
    },
    role: String
})
.pre('save', function() {
    this.password = bcrypt.hashSync(this.password, saltRounds)
  })
.pre('update', function() {
    this._update.$set.password = bcrypt.hashSync(this._update.$set.password, saltRounds);
})
)