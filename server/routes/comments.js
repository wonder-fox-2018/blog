var express = require('express');
var router = express.Router();
const Comment = require('../models/comment')
const auth = require('../middleware/authentication')

router.get('/', (req, res, next) => {
  Comment.find({})
  .populate('user')
  .populate('article')
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

router.get('/:articleId', (req, res, next) => {
  Comment.find({
    article: req.params.articleId
  })
  .populate('user')
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

router.post('/', auth, (req, res)=>{
  Comment.create({
    user: req.body.user,
    comment: req.body.comment,
    article: req.body.article
  })
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

router.put(`/:id`,  auth, (req, res)=>{
  Comment.findByIdAndUpdate(req.params.id, {
    user: req.body.user,
    comment: req.body.comment,
    article: req.body.article
  })
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

router.delete('/:id',  auth, (req, res)=>{
  Comment.findByIdAndDelete(req.params.id)
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

module.exports = router