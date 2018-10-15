'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name should not be empty']
    },
    email: {
        type: String,
        required: [true,'Email should not be empty'],
        unique: [true,'Please Check your email']
    },
    password: {
        type: String
    },
    thirdpartylogin: {
        type: String
    }
},{
    timestamps : true
})

UserSchema.post('validate', (doc)=>{
    let hash = hashPassword(doc.password)
    doc.password = hash
})

const User = mongoose.model('User', UserSchema)
module.exports = User