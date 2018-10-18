const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

var userSchema = new Schema({
    name : {
        type: String,
        required: [true, 'name is required']
    },
    email : {
        type: String,
        unique: [true, 'email is already exists'],
        required: [true, 'email is required']
    },
    password : {
        type: String,
        minlength: [5, 'password min 5 characters'],
        required: [true, 'password is required']
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { 
    timestamps: true 
})

userSchema.pre('save', function(next) {
    if(this.password){
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User