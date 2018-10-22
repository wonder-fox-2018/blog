const Article = require('../models/Article')
const Comment = require('../models/Comment')

class Controller {
  
  static getSearch(req,res){
      console.log(req.params.keyword)
      Article.find({title: new RegExp(req.params.keyword, 'i')})
      .then(data => {
          res.status(200).json(data)
       })
      .catch(err => {
          res.status(500).json({error: err.message})
      })
  }

  static getArticle(req, res) {
    Article.find()
      .populate({
        path: 'userId', 
        select: '_id name email'
      })
      .populate({
        path: 'comments', 
        select: '_id comment userId',
        populate: {
          path: 'userId',
          model: 'User',
          select: '_id name email'
        }
      }).sort({createdAt:-1})
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

  static getMyArticle(req, res) {
    Article.find({userId:req.decoded.id})
      .populate({
        path: 'userId', 
        select: '_id name email'
      })
      .populate({
        path: 'comments', 
        select: '_id comment userId',
        populate: {
          path: 'userId',
          model: 'User',
          select: '_id name email'
        }
      }).sort({createdAt:-1})
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

  static getArticleById(req, res) {
    Article.find({_id:req.params.id})
      .populate({
        path: 'userId', 
        select: '_id name email'
      })
      .populate({
        path: 'comments', 
        select: '_id comment userId',
        populate: {
          path: 'userId',
          model: 'User',
          select: '_id name email'
        }
      }).sort({createdAt:-1})
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

  static createArticle(req, res) {
      
      let newArticle = {
      title: req.body.title,
      content: req.body.content,
      imgUrl:req.body.imgUrl,
      userId: req.decoded.id
    }
    
    if(req.body.title==''||req.body.content==''){
      res.status(500).json({message:'your input wrong'})
    }


    Article.create(newArticle)
      .then(article => {
        Article.findById(article._id)
        .populate('userId', '_id name email')
          .then(data => {
            res.status(201).json(data)
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error: err.message})
      })
  }
  
  static deleteArticle(req, res) {
    Article.deleteOne({_id: req.params.id})
      .then(() => {
        Comment.deleteMany({articleId: req.params.id})
          .then(() => {
            res.status(200).json({message: 'Article deleted!', id: req.params.id})
          })
          .catch(err => {
            res.status(500).json({error: err.message})
          })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static update(req, res) {
    let newArticle = {
      title: req.body.title,
      content: req.body.content,
      imgUrl:req.body.imgUrl
    }
    
    Article.updateOne({_id: req.params.id}, newArticle)
      .then(article => {
        res.status(200).json({message: 'Article updated!', id: req.params.id})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static findArticle(req, res) {
    Article.find({_id:req.params.id})
      .populate({
        path: 'userId', 
        select: '_id name email'
      })
      .populate({
        path: 'comments', 
        select: '_id comment userId',
        populate: {
          path: 'userId',
          model: 'User',
          select: '_id name email'
        }
      })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
}

module.exports = Controller