const myComment = require('../models/comments')
const Article = require('../models/articles')

class Controller {
    static create(req,res){
        if (!req.body.thecomment || req.body.thecomment.length === 0) {
            res.status(500).json({message: 'Cannot post empty comment'})
        }else{
            myComment.create({
                thecomment : req.body.thecomment,
                author : req.userData._id //ini diambil dari hasil cek token di middleware
            })
            .then((result)=>{
                Article.findOneAndUpdate({
                    _id : req.params.id
                },{
                    $push : {
                        comments : result._id
                    }
                })
                .then((response)=>{
                    res.status(201).json(response)
                })
                .catch((err)=>{
                    res.status(500).json({
                        message : 'failed to post comment'
                    })
                })
                
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'comment failed'
                })
            })
        }
    }

    static read(req,res){
        
    }

    static readOne(req,res){

    }

}

module.exports = Controller;