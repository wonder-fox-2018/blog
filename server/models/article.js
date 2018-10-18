const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user');

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    img: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
}, { timestamps: true })


var Article = mongoose.model('Article', articleSchema)
articleSchema.pre('remove', function(next) {
    User.update({ _id: this.user }, {$pull: {articles: this._id}}, function(err, obj) {
        next()
    })
})

module.exports = Article