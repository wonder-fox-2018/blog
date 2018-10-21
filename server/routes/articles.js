var express = require('express');
var router = express.Router();
const Article = require('../models/article')
const auth = require('../middleware/authentication')

router.post('/', auth, (req, res)=>{
  console.log('masuk server')
  Article.create({
    image: req.body.image,
    author: req.body.author,
    title: req.body.title,
    contents: req.body.contents
  })
  .then((result) => {
    res.status(201).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });                                                                                                                                                                                                                                                                                                              
})

router.get('/', (req, res)=>{
  Article.find({})
  .populate('author')
  .populate('comments')
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.get('/:id', (req, res)=>{
  Article.findById(req.params.id)
  .populate('author')
  .populate('comments')
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.put('/:id', auth, (req, res)=>{
  // console.log(req.params.id, req.body)
  Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    contents: req.body.contents,
    image: req.body.image,
    $push: {comments: req.body.comment}
  })
  .then((result) => {
    console.log('==========>', result)
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})

router.delete('/:id', auth, (req, res)=>{
  Article.findByIdAndDelete(req.params.id)
  .then((result) => {
    console.log('==========>', result)
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
})


module.exports = router