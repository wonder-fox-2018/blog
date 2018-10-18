'use strict'

const ModelArticle = require('../models/Article');
const User = require('../models/UserModel');

module.exports = {
    articleReadAll: (req, res) => {
        ModelArticle
            .find({})
            .then((response) => {
                res.status(200).json({ articles:response });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },
    articleReadByAuthor: (req, res) => {    
        ModelArticle
            .find({author: req.currentuser._id})
            .populate('author')
            .exec()
            .then((response) => {
                res.status(200).json({ articles:response });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },
    articleSearch: (req, res) => {
        ModelArticle
        .find({title:new RegExp(req.body.search, 'i')})
        .populate('author')
        .exec()
        .then(result=>{
            res.status(200).json({articles:result}) 
        })      
        .catch(err=>{
            res.status(500).json({message:err.message})
        })   
    },
    articleReadById: (req, res) => {
        console.log('read by',req.body.id )
        ModelArticle
            .findOne({_id: req.body.id})
            .populate('author')
            .exec()
            .then((result) => {
                res.status(200).json({ article:result });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },
    articleCreate: (req, res) => {  
        let newArticle = new ModelArticle({
            title: req.body.title,
            description: req.body.description,
            author: req.currentuser._id
        });
        newArticle
            .save()
            .then((result) => {
                res.status(201).json({
                    message: 'Article Successfully Created',
                    articles: result                    
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error Creating Article!!',
                    err
                });
            })     
    },

    articleUpdate: (req, res) => {    
        let updateValue={};
        Object.assign(updateValue, 
            req.body.title ? { title: req.body.title } : null,
            req.body.description ? { description: req.body.description } : null
        );
        ModelArticle
            .findOneAndUpdate(
            { _id:req.body.articleid, author: req.currentuser._id },updateValue)
            .then((result) => {
                res.status(200).json({message: "Article Updated", article:result})
            }).catch((err) => {
                res.status(500).json({message: 'Error!!', err });                                                   
            });      
    },
    articleDelete: (req, res) => {
        ModelArticle
            .findOneAndDelete({_id:req.body.articleid, author: req.currentuser._id})
            .then((result) => {
                res.status(200).json({ message: 'Article deleted', result })
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error!!', err });
            });
    }
}