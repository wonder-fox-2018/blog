let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var validator = require('validator');

let UserSchema = new Schema({
    'firstName': {
        type: String,
        required: true
    },
    'lastName': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'invalid email',
            isAsync: false
        }
    },
    'password': {
        type: String,
        required: true
    },
    'createdAt': {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

UserSchema.pre('save', next => {
    if (!this.createdAt) {
        this.createdAt = new Date()
    }
    next()
})

module.exports = mongoose.model('User', UserSchema);