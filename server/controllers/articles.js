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
        .populate('author').exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {            
            res.status(500).json(err)
        });
    },
    del: (req, res) => {
        Article.remove({
            title: req.body.title,
            author: req.body.author,
            text: req.body.text
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
    }




}