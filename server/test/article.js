require("dotenv").config()
let hashPass = require("../helpers/hashPass")

const chai = require("chai"),
  jwt = require("jsonwebtoken"),
  chaiHttp = require("chai-http"),
  app = require("../app"),
  expect = chai.expect,
  User = require("../models/users"),
  Article = require("../models/articles")

chai.use(chaiHttp)

var name = "John Doe",
    email = "johnDoe@mail.co",
    password = "john-123",
    phone = "0011223344"

describe("Success Article Case", function() {

  it("/GET articles should return all articles", function(done) {
    chai
      .request(app)
      .get("/articles")
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('articles')
        expect(res.body.articles).to.be.a("array")
        done()
      })
  })
})

describe("Success Article Case", function() {

  let usertoken, author = '' , articleId = ''
  let title = "Testing",
      desc = "",
      imageurl = "",
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
                  usertoken = token,
                  author = String(userId)
                  done()
                }
              )
            })
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  it("/POST articles should return new object articles", function(done) {
    chai
      .request(app)
      .post("/articles")
      .set('token', usertoken)
      .send({
        title,
        author,
        desc,
        imageurl,
        category,
        commentlist
      })
      .end(function(err, res) {
        articleId = String(res.body.arts._id)
        // console.log(res.body)
        expect(res).to.have.status(200)
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property('arts')
        expect(res.body.arts).to.have.property('title')
        expect(res.body.arts).to.have.property('author')
        expect(res.body.arts.title).to.equal(title)
        done()
      })
  })

  it("/GET articles should return this user's articles", function(done) {
    let arts = new Article({
      title,
      author,
      desc,
      imageurl,
      category,
      commentlist
    })
    arts.save((err, arts) => {
    chai
      .request(app)
      .get(`/articles/${author}`)
      .set('token', usertoken)
      .send(arts)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a("object")
        done()
      })
    })
  })

  it("/PUT articles should return updated articles", function(done) {
    let arts = new Article({
      title,
      author,
      desc,
      imageurl,
      category,
      commentlist
    })
    arts.save((err, arts) => {
      chai
      .request(app)
      .put(`/articles/${articleId}`)
      .set('token', usertoken)
      .send({
        _id: arts._id,
        title : "Testing 2",
        author,
        desc : "Fill description for second",
        imageurl : "http://localhost:8080/anything",
        category,
        commentlist
      })
      .end(function(err, res) {
        // console.log(res.body)
        expect(res).to.have.status(200)
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property('upd')
        expect(res.body.upd).to.have.property('title')
        expect(res.body.upd).to.have.property('desc')
        done()
      })
    })
  })

  it("/DELETE articles should return status deleted articles", function(done) {
    let arts = new Article({
      title,
      author,
      desc,
      imageurl,
      category,
      commentlist
    })
    arts.save((err, arts) => {
      chai
      .request(app)
      .del(`/articles/${arts._id}`)
      .set('token', usertoken)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal(`succesfully deleted article`)
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

var name = "John Doe",
    email = "johnDoe@mail.co",
    password = "john-123",
    phone = "0011223344"

describe("Failed Article Case", function() {

  let usertoken, author = '' , articleId = ''
  let title = "Testing",
      desc = "",
      imageurl = "",
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
                  usertoken = token,
                  author = String(userId)
                  done()
                }
              )
            })
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  it("/POST articles unauthorized user should return error", function(done) {
    chai
      .request(app)
      .post("/articles")
      .set('token', 'usertokenrandom1234567890apajalah')
      .send({
        title,
        author,
        desc,
        imageurl,
        category,
        commentlist
      })
      .end(function(err, res) {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('access denied')
        done()
      })
  })

  it("/GET articles unauthorized user should return error", function(done) {
    let arts = new Article({
      title,
      author,
      desc,
      imageurl,
      category,
      commentlist
    })
    arts.save((err, arts) => {
    chai
      .request(app)
      .get(`/articles/personal`)
      .set('token', 'usertokenrandom1234567890apajalah')
      .send(arts)
      .end(function(err, res) {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('access denied')
        done()
      })
    })
  })

  it("/PUT articles unauthorized user should return error", function(done) {
    let arts = new Article({
      title,
      author,
      desc,
      imageurl,
      category,
      commentlist
    })
    arts.save((err, arts) => {
      chai
      .request(app)
      .put(`/articles/${articleId}`)
      .set('token', 'usertokenrandom1234567890apajalah')
      .send({
        _id: arts._id,
        title : "Testing 2",
        author,
        desc : "Fill description for second",
        imageurl : "http://localhost:8080/anything",
        category,
        commentlist
      })
      .end(function(err, res) {
        expect(res).to.have.status(404)
        done()
      })
    })
  })

  it("/DELETE articles unauthorized user should return errorr", function(done) {
    let arts = new Article({
      title,
      author,
      desc,
      imageurl,
      category,
      commentlist
    })
    arts.save((err, arts) => {
      chai
      .request(app)
      .del(`/articles/${arts._id}`)
      .set('token', 'usertokenrandom1234567890apajalah')
      .end(function(err, res) {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('access denied')
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
