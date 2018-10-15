process.env.NODE_ENV = 'test'
var app  = require('../app.js')
var chai = require('chai')
var expect = chai.expect
var Article = require('../models/Article')
var User = require('../models/User')
var jwt = require('jsonwebtoken')
var token
var userId
var articleId

describe('Articles', () => {
  
  beforeEach((done) => {    
    User.create({name: 'Tono', email: 'tono@mail.com', password: '123456'})
      .then(() => {
        User.findOne({email: 'tono@mail.com'})
          .then(user => {
            let objUser = {
              id: user._id,
              name: user.name,
              email: user.email
            }
            
            token = jwt.sign(objUser, process.env.JWT_SECRET)
            userId = String(objUser.id)
            

            let newArticle = {
              title: 'Article 1',
              content: 'iagioajsogjasogjoiajgijasgjsagiasgjlkjl',
              userId: userId
            }
            
            Article.create(newArticle)
              .then(article => {
                articleId = String(article._id)
                done()
              })
          })
      })
  })
  
  afterEach((done) => {
    Article.remove({}, () => {
      User.remove({}, () => {
        done()
      })
    })
  })
  
  it('GET /articles should return all article', (done) => {
    chai.request(app)
      .get('/articles')
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body).to.be.a('array')
        expect(result.body).to.have.lengthOf(1)
        expect(result.body[0]).to.have.property('title')
        expect(result.body[0].title).to.equal('Article 1')
        done()
      })
  })
  

  it('POST /articles should return new article', (done) => {
    chai.request(app)
      .post('/articles')
      .send({title: 'Article 1', content: 'aljgasjgsahgaslgjaljg'})
      .set('token', token)
      .end((err, result) => {
        expect(result).to.have.status(201)
        expect(result.body).to.have.property('title')
        expect(result.body.userId._id).to.equal(userId)
        done()
      })
  })
  
  it('POST /articles without token should return error message', (done) => {
    chai.request(app)
      .post('/articles')
      .send({title: 'Article 1', content: 'aljgasjgsahgaslgjaljg'})
      .end((err, result) => {
        expect(result).to.have.status(401)
        expect(result.body).to.have.property('error')
        expect(result.body.error).to.equal('Please login first')
        done()
      })
  })
  
  it('DELETE /articles/:id should return deleted article id', (done) => {
    chai.request(app)
      .delete(`/articles/${articleId}`)
      .set('token', token)
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body.id).to.equal(articleId)
        done()
      })
  })
  
  it('PUT /articles/:id should return updated article', (done) => {
    chai.request(app)
      .put(`/articles/${articleId}`)
      .send({name: 'Article 2', content: 'alighiajtrliajrlijalj'})
      .set('token', token)
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body.id).to.equal(articleId)
        done()
      })
  })
  
  it('GET /articles/:id should return spesific article', (done) => {
    chai.request(app)
      .get(`/articles/${articleId}`)
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body).to.have.property('title')
        expect(result.body.comments).to.be.a('array')
        done()
      })
  })
  
})