const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title : String,
    article : String,
    img : {
        type : String,
        default : 'https://www.finansialku.com/wp-content/uploads/2018/01/Gambar-Tipografi-01-Finansialku.jpg'
    },
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