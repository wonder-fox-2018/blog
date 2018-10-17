const Article = require('../models/articles')

class Controller {
    static create(req,res){
        Article.create({
            title : req.body.title,
            content : req.body.content,
            picture : req.body.picture,
            category : req.body.category,
            author : req.userData._id //ini diambil dari hasil cek token di middleware
        })
        .then((result)=>{
            res.status(201).json({
                message : 'create article success',
                created : result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'create article failed'
            })
        })
    }

    static read(req,res){
        Article.find()
        .populate('category')
        .populate('author')
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'read article failed'
            })
        })
    }

}

module.exports = Controller;