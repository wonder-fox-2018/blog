const Article = require('../models/articleModel')
const Comment = require('../models/commentModel')
const errCatcher = require('../helpers/errCatcher')
const errCatcherArticle = require('../helpers/errCatcherArticle')

class ArticleContrroller {

  static getMyArticle(req, res) {
    Article.find({
        userId: req.decoded.id
      })
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static createArticle(req, res) {
    let data = {
      imgHeader: req.file.cloudStoragePublicUrl,
      title: req.body.title,
      description: req.body.description,
      userId: req.decoded.id,
      categoryId: req.body.categoryId
    }
    let article = new Article(data)

    article.save()
      .then(data => {
        res.status(201).json({
          status: 'success',
          message: `creating article success`,
          data: data
        })
      })
      .catch(err => {
        let msg = errCatcherArticle(err.message)
        if (msg === 'Cast to ObjectID failed for value "" at path "categoryId"') {
          msg = 'Category required'
        }
        res.status(500).json({
          status: 'failed',
          message: msg
        })
      })
  }

  static updateArticle(req, res) {

    let data = {
      title: req.body.title,
      description: req.body.description,
      categoryId: req.body.categoryId
    }
    Article.updateOne({
        _id: req.params.id,
        userId: req.decoded.id
      }, data, {
        runValidators: true
      })
      .then(data => {
        if (data.nModified === 1) {
          res.status(200).json({
            status: 'success',
            message: `success updating article with id ${req.params.id}`
          })
        } else {
          res.status(403).json({
            status: 'failed',
            message: `failed updating article`
          })
        }
      })
      .catch(err => {
        let msg = errCatcherArticle(err.message)
        res.status(500).json({
          status: 'failed',
          message: msg
        })
      })
  }

  static deleteArticle(req, res) {
    Article.deleteOne({
        _id: req.params.id,
        userId: req.decoded.id
      })
      .then(data => {
        if (data.n == 1) {

          Comment.deleteMany({
              articleId: req.params.id
            })
            .then(data => {
              res.status(200).json({
                status: 'success',
                message: `success deleting article with id ${req.params.id}`
              })
            })

        } else {
          res.status(403).json({
            status: 'failed',
            message: 'failed deleting article'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static getAllArticle(req, res) {
    Article.find()
      .populate('userId', 'fname')
      .populate('categoryId', 'name')
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static getSpesificArticle(req, res) {
    Article.findOne({
        _id: req.params.id
      })
      .populate('userId')
      .populate({
        path: 'commentId',
        populate: {
          path: 'userId'
        }
      })
      .populate('categoryId')
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }
  static getArticleByCategory(req, res) {
    Article.find({
        categoryId: req.params.id
      })
      .populate('categoryId', 'name')
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

  static getArticleByTitle(req, res) {
    Article.find({
        title: {
          $regex: `${req.params.title}`,
          $options: "i"
        }
      })
      .populate('categoryId', 'name')
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

}
module.exports = ArticleContrroller
