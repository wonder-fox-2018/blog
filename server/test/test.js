const chai = require('chai')
const expect = chai.expect
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = require('../app')
const chaiHttp = require('chai-http')

const auth = require('../middleware/authentication')

const User = require('../models/user')

const Article = require('../models/article')

chai.use(chaiHttp)

describe('check authentication function', function() {
  let userCredential = {
    email: 'test@mail.com',
    password: 'test123'
  }
  let token = jwt.sign(userCredential, process.env.JWT_KEY)
  it('authentication should return decoded object', function(done) {
    // let headers = `Bearer ${token}`
    jwt.verify(token, process.env.JWT_KEY, (err, decoded)=>{
      // console.log(decoded)
      expect(decoded.email).to.equal('test@mail.com')
      expect(decoded).to.be.an('object')
      done()
    })
    
  })
})


describe('check routes user', function () {

  // before(function (done) {    
  //   mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true }, function () {
  //     User.create()
  //   })
  //   done()
  // })

  // it('POST /register ', function (done) {
  //   chai.request(app)
  //     .post('/users/register')
  //     .set('Content-type', 'application/x-www-form-urlencoded')
  //     .send({
  //       username: 'test',
  //       email: 'test@mail.com',
  //       password: 'test123'
  //     })
  //     .end(function (err, res) {
  //       expect(res).to.have.status(200) // check status 
  //       expect(res).to.be.an('object') // check type data
  //       expect(res.body).to.have.property('username')
  //       expect(res.body).to.have.property('email')
  //       expect(res.body).to.have.property('password')
  //       expect(res.body.username).to.equal('test')
  //       expect(res.body.email).to.equal('test@mail.com')
  //       expect(res.body.password).to.equal('test123')
  //       done()
  //     })
  // })

  // it('POST /signin', function (done) {
  //   chai.request(app)
  //     .post('/users/signin')
  //     .set('Content-type', 'application/x-www-form-urlencoded')
  //     .send({
  //       email: 'test@mail.com',
  //       password: 'test123'
  //     })
  //     .end(function (err, res) {   
  //       expect(res).to.have.status(200) // check status 
  //       expect(res).to.be.an('object') // check type data
  //       expect(res.body).to.have.property('email')
  //       expect(res.body).to.have.property('password')
  //       expect(res.body.email).to.equal('test@mail.com')
  //       done()
  //     })
  // })

})




describe('Routes article', function () {

  // before(function (done) {
  //   mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true }, function () {
  //     Article.create()
  //   })
  // })

  // it('POST /articles make new article', function (done) {
  //   chai.request(app)
  //     .post('/articles')
  //     .send({
  //       author: '5bc44f41e5d0c8610eac4658', //id
  //       title: 'test',
  //       content: 'lorem ipsum'
  //     })
  //     .end(function (err, res) {
  //         expect(res).to.have.status(201)
  //         expect(res).to.be.an('object')
  //         expect(res.body).to.have.property('title')
  //         expect(res.body.title).to.equal('test')
  //         done()
  //       })
  // })
      
  // it('GET /article get article data', function (done) {
  //   chai.request(app)
  //     .get('/articles')
  //     .end(function (err, res) {
  //       expect(res).to.have.status(200)
  //       expect(res).to.be.a('object')
  //       expect(res.body[0]).to.have.property('title')
  //       expect(res.body[0].title).to.equal('test2')
  //     })
  //   done()
  // })

  // it('PUT /articles/:id should return updated article', function (done) {
  //   chai.request(app)
  //     .put(`/articles/5bc48ea1d9e0b317c0b7f919`)
  //     .send({
  //       author: '5bc44f41e5d0c8610eac4658',
  //       title: 'test',
  //       content: 'ini jadoel'
  //     })
  //     .end(function (err, res) {
  //       // console.log('res.body-->', res.body)
  //       expect(res).to.have.status(200)
  //       expect(res).to.be.an('object')
  //       expect(res.body).to.have.property('title')
  //       expect(res.body.title).to.equal('test')
  //       done()
  //     })
  // })

  // it('DELETE /articles/:id should return all article', function (done) {
  //   chai.request(app)
  //     .delete('/articles/5bc48ea1d9e0b317c0b7f919')
  //     .send()
  //     .end(function (err, res) {    
  //       console.log(res)    
  //       expect(res).to.have.status(200)
  //       expect(res).to.be.an('object') 
  //       expect(res.body).to.have.property('title')
  //       expect(res.body.title).to.equal('test')              
  //       done()
  //     })
  // })
})