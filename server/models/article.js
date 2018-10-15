'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true,'Title should not be empty']
    },
    description: {
        type: String,
        required: [true,'Description should not be empty']   
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    listcomments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{
    timestamps: true
})

const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article