require("dotenv").config()
let hashPass = require("../helpers/hashPass")

const chai = require("chai"),
  jwt = require("jsonwebtoken"),
  chaiHttp = require("chai-http"),
  app = require("../app"),
  expect = chai.expect,
  User = require("../models/users")
  Article = require("../models/articles"),
  Comment = require("../models/comments")

chai.use(chaiHttp)

var name = "John Doe",
    email = "johnDoe@mail.co",
    password = "john-123",
    phone = "0011223344"

describe("Success Comment Case", function() {

  let usertoken, author = '' , articleId = '', owner = ''
  let title = "Testing",
      desc = "",
      category = "",
      commentlist = []
  
  beforeEach(function(done) {
    User.create({
      name,
      email,
      password,
      phone
    })
      .then(() => {
          User.findOne({
            email,
            password: hashPass(password)
          })
            .then(user => {
              userId = user._id
              jwt.sign({
                userId : userId
              }, process.env.ACCESS_KEY,
                function(err, token) {
                  if (token) {
                  usertoken = token,
                  author = String(userId)
                  owner = String(userId)

                  let arts = new Article({
                    title,
                    author,
                    desc,
                    category,
                    commentlist
                  })
                  arts.save((err, arts) => {
                    if (arts) {
                      articleId = arts._id
                      done()
                    }
                    else console.log(err)
                  })
                } else console.log(err)
              })
            })
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  it("/GET comments should return all comments", function(done) {
    chai
      .request(app)
      .get(`/comments/${articleId}`)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('comment')
        expect(res.body.comment).to.be.a("array")
        done()
      })
  })
  
  it("/POST comments should return new object comments", function(done) {
    chai
      .request(app)
      .post(`/comments/${articleId}`)
      .set('token', usertoken)
      .send({
        owner : userId,
        comment : "this is my first comment"
      })
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property('commt')
        expect(res.body.commt).to.have.property('comment')
        expect(res.body.commt).to.have.property('owner')
        expect(res.body.commt.owner).to.equal(owner)
        done()
      })
  })

  it("/DELETE articles should return status deleted comments", function(done) {
    let comment = new Comment({
      owner : userId,
      comment : "this is my first comment"
    })
    comment.save((err, comment) => {
      chai
      .request(app)
      .del(`/comments/${comment._id}`)
      .set('token', usertoken)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal(`succesfully delete comment`)
        done()
      })
    })
  })

  afterEach(function(done) {
    User.deleteOne({
      email
    })
    .then (() => {
      Article.deleteOne({
        title
      })
      .then (() => {
        done()
      })
    })
    .catch(err => {
      console.log(err.message)
    })
  })
})


var name = "John Duh",
    email = "johnDuhe@mail.co",
    password = "john-123",
    phone = "0011223344"

describe("Failed Comment Case", function() {

  let usertoken, author = '' , articleId = '', owner = ''
  let title = "Testing",
      desc = "",
      category = "",
      commentlist = []
  
  beforeEach(function(done) {
    User.create({
      name,
      email,
      password,
      phone
    })
      .then(() => {
          User.findOne({
            email,
            password: hashPass(password)
          })
            .then(user => {
              userId = user._id
              jwt.sign({
                userId : userId
              }, process.env.ACCESS_KEY,
                function(err, token) {
                  if (token) {
                  usertoken = token,
                  author = String(userId)
                  owner = String(userId)

                  let arts = new Article({
                    title,
                    author,
                    desc,
                    category,
                    commentlist
                  })
                  arts.save((err, arts) => {
                    if (arts) {
                      articleId = arts._id
                      done()
                    }
                    else console.log(err)
                  })
                } else console.log(err)
              })
            })
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  it("/POST comments unauthorized user should return error", function(done) {
    chai
      .request(app)
      .post(`/comments/${articleId}`)
      .set('token', 'randomusertoken1234567890')
      .send({
        owner : userId,
        comment : "this is my first comment"
      })
      .end(function(err, res) {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('access denied')
        done()
      })
  })

  it("/DELETE articles unauthorized user should return error", function(done) {
    let comment = new Comment({
      owner : userId,
      comment : "this is my first comment"
    })
    comment.save((err, comment) => {
      chai
      .request(app)
      .del(`/comments/${comment._id}`)
      .set('token', 'randomusertoken1234567890')
      .end(function(err, res) {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('access denied')
        done()
      })
    })
  })

  it("/POST comments no login should return error", function(done) {
    chai
      .request(app)
      .post(`/comments/${articleId}`)
      .send({
        owner : userId,
        comment : "this is my first comment"
      })
      .end(function(err, res) {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('login first to access this feature')
        done()
      })
  })

  it("/DELETE articles no login should return error", function(done) {
    let comment = new Comment({
      owner : userId,
      comment : "this is my first comment"
    })
    comment.save((err, comment) => {
      chai
      .request(app)
      .del(`/comments/${comment._id}`)
      .end(function(err, res) {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('login first to access this feature')
        done()
      })
    })
  })

  afterEach(function(done) {
    User.deleteOne({
      email
    })
    .then (() => {
      Article.deleteOne({
        title
      })
      .then (() => {
        done()
      })
    })
    .catch(err => {
      console.log(err.message)
    })
  })
})
