const Article = require('../models/articles')

class Controller {
    static create(req,res){
        if ((!req.body.title && !req.body.content) || (req.body.title.length === 0 && req.body.content.length === 0)) {
            res.status(500).json({message: 'An article need a content and title'})
        } else if (!req.body.title || req.body.title.length === 0) {
            res.status(500).json({message: 'An article need to be titled'})
        }else if(req.body.picture.length === 0){
            req.body.picture = 'http://placehold.it/750x300'
        } else if (!req.body.content || req.body.content.length === 0) {
            res.status(500).json({message: 'An article need a content'})
        } else {
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
    }

    static read(req,res){
        Article.find()
        .populate('category')
        .populate('author')
        .populate('comments')
        .then((result)=>{
            res.status(201).json({
                data : result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'read article failed'
            })
        })
    }

    static readOne(req,res){
        Article.findById(req.params.id)
        .populate('category')
        .populate('author')
        .populate({ path: "comments", populate: { path: "user" } })
        .then((result)=>{
            res.status(200).json({
                data : result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'cant find article'
            })
        })
    }

    static search(req,res){
        Article.find({
            title: new RegExp(req.query.keyword, 'i')
        }, null, {
            sort: {
                title: 'ASC'
            }
        })
        .populate('author')
        .then(data => {
            res.status(200).json({
                data: data
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
    }

    static my(req,res){
        Article.find({
            author : req.userData._id
        })
        .then((result)=>{
            // console.log('result in server',result)
            res.status(201).json({
                message : 'get my article success',
                data : result
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message : 'get my article failed'
            })
        })
    }

    static byCategory(req,res){
        Article.find({
            category : req.params.id
        })
        .then((result)=>{
            res.status(201).json({
                data : result
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message : 'get article by category failed'
            })
        })
    }

    static delete(req,res){
        Article.findOneAndDelete(req.params.id)
        .then((deleted)=>{
            res.status(200).json({
                message : 'Article deleted successfully'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Delete article failed'
            })
        })
    }

    static update(req,res){
        if ((!req.body.title && !req.body.content) || (req.body.title.length === 0 && req.body.content.length === 0)) {
            res.status(500).json({message: 'An article need a content and title'})
        } else if (!req.body.title || req.body.title.length === 0) {
            res.status(500).json({message: 'An article need to be titled'})
        } else if (!req.body.content || req.body.content.length === 0) {
            res.status(500).json({message: 'An article need a content'})
        } else {
            Article.findOneAndUpdate({
                _id : req.params.id
            },{
                title : req.body.title,
                content : req.body.content,
                picture : req.body.picture,
                category : req.body.category,
                author : req.userData._id
            })
            .then((change)=>{
                res.status(201).json({
                    message : 'update success',
                    updated : change
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'update failed'
                })
            })
        }
    }

}

module.exports = Controller;