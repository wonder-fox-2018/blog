'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Article = require('../models/article')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)
const expect = chai.expect

describe('Article CRUD', ()=>{

    let user = {
        name: 'Barry',
        email: 'barry@mail.com',
        password: 'barry'
    }
    let tokenTest = ''
    let userIdTest = ''
    let articleIdTest = ''
    beforeEach((done)=>{
        User.create({
            name: user.name,
            email: user.email,
            password: user.password
        })
         .then(user =>{
            // get user id 
            userIdTest = user._id 
            jwt.sign({
                userid: user._id,
                name: user.name,
                email: user.email
            },process.env.SECRETTOKEN, (err,token)=>{
                if(!err){
                    tokenTest = token
                    // create article
                    Article.create({
                        title: 'Sample Article',
                        description: 'This is description',
                        author: userIdTest
                    })
                      .then(article =>{
                         articleIdTest = article._id
                         done()
                      })
                      .catch(error =>{
                         console.log('ERROR Create Article-----', error)
                         done()
                      })
                }else{
                    console.log('ERROR JWT Sign----',err)
                    // done()
                }
            })
         })
         .catch(error =>{
             console.log('ERROR Before Each----',error)
             done()
         })
    })

    describe('Create Article', ()=>{
        it('should create an article with success message', (done)=>{
            chai.request(app)
                .post('/articles')
                .set('token', tokenTest)
                .send({
                    title: 'Test Create Article',
                    description: 'Description of test create article',
                    author: userIdTest
                })
                .end((err,res)=>{
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('data')
                    expect(res.body.data.title).to.equal('Test Create Article')
                    done()
                })
        })
    })

    describe('Get List of article', ()=>{
        it('should get list of articles with success message', (done)=>{
            chai.request(app)
                .get('/articles/lists')
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(res.body.data).to.be.an('array')
                    done()
                })
        })
    })

    describe('Get Detail of article', ()=>{
        it('should create an article with success message',(done)=>{
            chai.request(app)
                .get(`/articles/${articleIdTest}`)
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.data).to.have.a.property('title')
                    expect(res.body.data.title).to.equal('Sample Article')
                    done()
                })
        })
    })

    describe('Edit Article', ()=>{
        it('should edit an article with success message',(done)=>{
            chai.request(app)
                .put(`/articles/${articleIdTest}`)
                .set('token',tokenTest)
                .send({
                    title: 'Updated article',
                    description: 'This is article'
                })
                .end((err,res)=>{
                    expect(res).to.have.status(201)
                    chai.request(app)
                    .get(`/articles/${articleIdTest}`)
                    .end((err,res)=>{
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body.data).to.have.a.property('title')
                        expect(res.body.data.title).to.equal('Updated article')
                        done()
                    })
                })
        })
    })

    describe('Delete Article', ()=>{
        it('should delete article with success message', (done)=>{
            chai.request(app)
                .delete(`/articles/${articleIdTest}`)
                .set('token', tokenTest)
                .end((err,res)=>{
                    expect(res).to.have.status(201)
                    expect(res.body.msg).to.equal('Article Deleted')
                    done()
                })
        })
    })

    describe('Negative Test - Unauthorized User try to delete article', ()=>{
        it('should give an error message', (done)=>{
            chai.request(app)
              .post('/user/register')
              .send({
                  name: 'Another man',
                  email: 'another@mail.com',
                  password: 'another'
              })
              .end((err,res)=>{
                  let anotherToken = res.body.token
                  expect(res).to.have.status(201)
                  expect(res.body).to.have.property('token')
                  
                  // try to delete article
                  chai.request(app)
                    .delete(`/articles/${articleIdTest}`)
                    .set('token', anotherToken)
                    .end((err,res)=>{
                        expect(res).to.have.status(403)
                        expect(res.body.msg).to.equal('User is not authorized to delete article')
                        done()
                    })
              })
        })
    })

    afterEach((done)=>{
        // delete all article
        Article.deleteMany({})
          .then(article =>{
             // delete user
             User.remove()
                .then(user=>{
                    done()
                })
                .catch(error =>{
                    console.log('ERROR Delete User----',error)
                    done()
                })
          })
          .catch(error =>{
              console.log('ERROR delete article after Each---',error)
              done()
          })
    })
})