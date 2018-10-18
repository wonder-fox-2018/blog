const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const commentSchema = new Schema({
    comment:{
        type: String,
        required: true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps: true
});

// commentSchema.pre('remove', function(next) {
//     User.update({ _id: this.user }, { "$pull": { "comments": this._id }},function(err, obj) {
//         next();
//     });
// });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;