const Article = require('../models/article')
    
module.exports = {
    add: (req, res) => {
        Article.create({
            title: req.body.title,
            text: req.body.text,
            author: req.decoded.id,
            img: req.body.img
        })
        .then((result) => {
            res.status(201).json({msg: 'add article success', result: result})
        }).catch((err) => {
            res.status(500).json(err)
        });

    },
    find: (req, res) => {        
        Article.findOne({
            _id: req.params.id
        })
        .populate('author')
        .populate({
            path :'comments',
            model :'Comment',
            populate :{
              path : 'user',
              model : 'User'}})
        .exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {            
            res.status(500).json(err)
        });
    },
    del: (req, res) => {
        Article.remove({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    getAll: (req, res) => {
        Article.find()
        .populate('author').exec()
        .then((result) => {
            res.status(200).json(result)
            
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    edit: (req, res) => {
        Article.update({
            _id: req.params.id
        }, {
            title: req.body.title,
            img: req.body.img,
            text: req.body.text
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    search: (req, res) => {
        var regexQuery = {
            title: new RegExp(req.params.q, 'i')
        }
        Article.find(regexQuery)
        .then((result) => {
            res.status(200).json({result})
        }).catch((err) => {
            res.status(500).json({err})
        }) 
    },
    myArticles: (req, res) => {
        Article.find({
            author: req.decoded.id
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({err})
        });
    }




}