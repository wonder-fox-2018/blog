'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true,'Name should not be empty']
    },
    email: {
        type: String,
        unique: [true,'Please Check your email']
    },
    password: {
        type: String,
        required: [true,'Password should not be empty']
    },
    thirdpartylogin: {
        type: String
    },
    articleslist: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
},{
    timestamps : true
})

UserSchema.post('validate', (doc)=>{
    let hash = hashPassword(doc.password)
    doc.password = hash
})

const User = mongoose.model('User', UserSchema)
module.exports = User