const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title : String,
    article : String,
    img : String,
    category : String,
    username : String,
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
    timestamps : true
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article