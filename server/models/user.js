const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username : {
        type : String,
        required : ['true', 'Username must be filled']
    },
    email : {
        type : String,
        required : ['true', 'Email must be filled']
    },
    password : {
        type : String, 
        required : ['true', 'password must be filled']
    },
    role : {
        type : String,
        default : 'user'
    }

})

userSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User