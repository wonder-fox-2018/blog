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

  it('POST /register ', function (done) {
    chai.request(app)
      .post('/users/register')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'test',
        email: 'test@mail.com',
        password: 'test123'
      })
      .end(function (err, res) {
        expect(res).to.have.status(200) // check status 
        expect(res).to.be.an('object') // check type data
        expect(res.body).to.have.property('username')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('password')
        expect(res.body.username).to.equal('test')
        expect(res.body.email).to.equal('test@mail.com')
        done()
      })
  })

  it('POST /signin', function (done) {
    chai.request(app)
      .post('/users/signin')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@mail.com',
        password: 'test123'
      })
      .end(function (err, res) {   
        expect(res).to.have.status(200) // check status 
        expect(res).to.be.an('object') // check type data
        expect(res.body.result).to.have.property('email')
        expect(res.body.result).to.have.property('password')
        expect(res.body.result.email).to.equal('test@mail.com')
        done()
      })
  })

  after(function(done) {
    User.deleteOne({
      username: 'test',
      email: 'test@mail.com',
    })
    .then((result) => {
      done()
    }).catch((err) => {
      console.log(err)
    });
  })

})




describe('Routes article', function () {
  let data = {
    title: 'judul',
    contents: 'kontent kontent kontent kontent kontent',
    author: '5bcd516573ea6a50dd6fae89',
    image: 'https://storage.googleapis.com/my-blog-hacktiv-portfolio/154018237206096567b2a-c60a-47ef-8837-e4822bb3b19a.png'
  }
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzVkOTMxYTIyOWM0MjJjZjMyZjI1NiIsImVtYWlsIjoiZkBtYWlsLmNvbSIsImlhdCI6MTU0MDE4MjI4Nn0.OXJBUi_sWdzxgSPQklgxwwWze5cj9ISpCnUBMJ_vfs4'
  before(function (done) {
  //   mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true }, function () {
      Article.create(data)
      .then((result) => {
        let id = result._id
        console.log('ini ID+_+_+_', id)
        done()
      }).catch((err) => {
        console.log(err)
      });
  //   })
  })

  it('POST /articles should make new article', function (done) {
    chai.request(app)
      .post('/articles')
      .set({authorization:`Bearer ${token}`})
      .send({
        author: data.author, //id
        title: 'test',
        contents: 'lorem ipsum'
      })
      .end(function (err, res) {
        
          expect(res).to.have.status(201)
          expect(res).to.be.an('object')
          expect(res.body).to.have.property('title')
          expect(res.body.title).to.equal('test')
          done()
        })
  })
      
  it('GET /article get article data', function (done) {
    chai.request(app)
      .get('/articles')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.a('object')
        expect(res.body[0]).to.have.property('title')
      })
    done()
  })

  it('PUT /articles/:id should return updated article', function (done) {
    chai.request(app)
      .put(`/articles/${id}`)
      .set({authorization:`Bearer ${token}`})
      .send({
        title: 'test',
        contents: 'ini jadoel'
      })
      .end(function (err, res) {
        
        expect(res).to.have.status(200)
        expect(res).to.be.an('object')
        expect(res.body).to.have.property('title')
        expect(res.body.title).to.equal('test')
        done()
      })
  })

  it('DELETE /articles/:id should return deleted article', function (done) {
    chai.request(app)
      .delete(`/articles/${id}`)
      .set({authorization:`Bearer ${token}`})
      .send()
      .end(function (err, res) {      
        console.log('bbBODYYYY----', res.body)
        expect(res).to.have.status(200)
        expect(res).to.be.an('object') 
        expect(res.body).to.have.property('title')
        expect(res.body.title).to.equal('test')              
        done()
      })
  })

  after(function(done) {
    Article.deleteOne({
      title: 'judul',
      contents: 'kontent kontent kontent kontent kontent',
      author: '5bcd516573ea6a50dd6fae89'
    })
    .then((result) => {
      done()
    }).catch((err) => {
      console.log(err)
    });
  })
})
