const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already exists']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Min characters length is 4'],
        maxlength: [10, 'Max characters length is 10']
    },
    role: String
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;