var express = require('express');
var router = express.Router();
const User = require('../models/user')
const hash = require('../helpers/hash')
const jwt = require('jsonwebtoken')
// import auth from '../middleware/authentication'

/* GET users listing. */
router.post('/register', (req, res)=>{
  console.log(hash.hash(req.body.password))
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hash.hash(req.body.password)
  })
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(400).json(err)
  });
});

router.post('/signin', (req, res)=>{
    User.findOne({
      email: req.body.email
    })
    .then((result) => {
      if(hash.decodePass(result.password,req.body.password)===false) {
        res.status(400).json({message:'Please insert the correct password!'})
      } else
      if(!result) {
        res.status(400).json({message:'Please fill in the form correctly!'})
      } else {
        let token = jwt.sign({id:result._id, email:result.email}, process.env.JWT_KEY)
        res.status(200).json({result,token,username:result.username})
      }
    }).catch((err) => {
      res.status(400).json(err)
    });
    // } else {
    //   res.status(400).json({message:'Please insert the correct password!'})
    // }
});


module.exports = router;
