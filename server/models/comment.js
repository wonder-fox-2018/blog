'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: {
        type: String,
        required: [true,'Comment should not be empyt']
    },
    articleid: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comentator: String
},{
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment