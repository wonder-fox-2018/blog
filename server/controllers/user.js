const User = require('../models/User')
const encrypt = require('../helpers/encrypt')
const jwt = require('jsonwebtoken')

class Controller {
  static update(req, res) {
    let newUser = {
      name: req.body.name,
      avatar:req.body.imgUrl
    }
    
    User.updateOne({_id: req.decoded.id}, newUser)
      .then(article => {
        res.status(200).json({message: 'User updated!', id: req.decoded.id})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

  static create(req, res) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    console.log(newUser)
    User.create(newUser)
      .then(user => {
        res.status(201).json({name: user.name, email: user.email})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static login(req, res) {
    let hashed = encrypt.hashPassword(req.body.password, req.body.email)
    
    User.findOne({email: req.body.email, password: hashed})
      .then(user => {
        let objUser = {
          id: user._id,
          name: user.name,
          email: user.email
        }
        
        jwt.sign(objUser, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            res.status(500).json(err)
          } else {
            res.status(200).json({token: token, id: objUser.id, email: objUser.email})
          }
        })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static getOne(req,res){
      
  }

  static fetch(req,res){
      User.findOne({_id:req.decoded.id})
      .then((data)=>{
          res.status(200).json(data)
      })
      .catch((err)=>{
          res.status(500).json(err)
      })
  }
}

module.exports = Controller