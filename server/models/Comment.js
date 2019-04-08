'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Comment', schema({
    title: String,
    description: String,
    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})
)