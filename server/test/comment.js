process.env.NODE_ENV = 'test'
var app  = require('../app.js')
var chai = require('chai')
var expect = chai.expect
var Article = require('../models/Article')
var User = require('../models/User')
var Comment = require('../models/Comment')
var jwt = require('jsonwebtoken')
var token
var userId
var articleId
var commentId

describe('Comment', () => {
  
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
                
                let newComment = {
                  articleId: articleId,
                  comment: 'Mantap jiwa bosq!',
                  userId: userId
                }
                
                Comment.create(newComment)
                  .then(comment => {
                    commentId = String(comment._id)
                    
                    done()
                  })
              })
          })
      })
  })
  
  afterEach((done) => {
    Article.remove({}, () => {
      User.remove({}, () => {
        Comment.remove({}, () => {
          done()
        })
      })
    })
  })
  
  it('POST /comment should return new comment', (done) => {
    chai.request(app)
      .post(`/comment/${articleId}`)
      .send({comment: 'Mantap jiwa', articleId: articleId, userId: userId})
      .set('token', token)
      .end((err, result) => {
        expect(result).to.have.status(201)
        expect(result.body).to.have.property('comment')
        expect(result.body.userId._id).to.equal(userId)
        done()
      })
  })
  
  it('DELETE /comment:id should return deleted comment id', (done) => {
    chai.request(app)
      .delete(`/comment/${commentId}`)
      .send({articleId: articleId})
      .set('token', token)
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body.id).to.equal(commentId)
        done()
      })
  })
  
})