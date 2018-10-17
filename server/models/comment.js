const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    title : String, 
    comment : String,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    article : {
        type : Schema.Types.ObjectId,
        ref : 'Article'
    }
})

const Comment  = mongoose.model('Comment', commentSchema)
module.exports = Comment