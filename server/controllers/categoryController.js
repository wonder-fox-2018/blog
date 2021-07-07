const Category = require('../models/category')

class Controller {
    static create(req,res){
        Category.create({
            name : req.body.name
        })
        .then((result)=>{
            res.status(201).json({
                created : result,
                message : 'create category success'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'create category failed'
            })
        })
    }

    static read(req,res){
        Category.find()
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'read category failed'
            })
        })
    }
}

module.exports = Controller;