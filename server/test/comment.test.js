'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')
const app = require('../app')
const User = require('../models/user')
const Article = require('../models/article')
const Commentary = require('../models/comment')
chai.use(chaiHttp)
const expect = chai.expect

describe('Commentary CRUD', ()=>{

    let tokenTest = ''
    let userIdTest = ''
    let userNameTest = ''
    let articleIdTest = ''
    let commentIdTest = ''
    beforeEach((done)=>{
        // create user
        User.create({
            name: 'Tom',
            email: 'tom@mail.com',
            password: 'tom'
        })
         .then(user =>{
             userIdTest = user._id
             userNameTest = user.name
            // get token
            jwt.sign({
                userid: user._id,
                name: user.name,
                email: user.email
            },process.env.SECRETTOKEN,(err,token)=>{
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

                         // create comment
                         Commentary.create({
                             content: 'This is comment',
                             articleid: articleIdTest,
                             userid: userIdTest,
                             comentator: userNameTest
                         })
                           .then(comment =>{
                              commentIdTest =  comment._id
                              done()
                           })
                           .catch(error =>{
                               console.log('ERROR Create Comment - beforeEach ',error)
                           })
                      })
                      .catch(error =>{
                         console.log('ERROR Create Article - beforeEach ',error)
                         done()
                      })
                }else{
                    console.log('ERROR JWT TOKEN - beforeEach ',err)
                    done()
                }
            })
         })
         .catch(error =>{
             console.log('ERROR Create User - beforeEach',error)
             done()
         })
    })


    describe('Create Comment', ()=>{
        it('should create comment and give success message', (done)=>{
            chai.request(app)
             .post('/comments')
             .set('token', tokenTest)
             .send({
                 content: 'Your second comment',
                 articleid: articleIdTest
             })
             .end((err,res)=>{
                 expect(res).to.have.status(201)
                 expect(res.body.data).to.be.an('object')
                 expect(res.body.data).to.have.a.property('content')
                 expect(res.body.data.content).to.equal('Your second comment')
                 done()
             })
        })
    })

    describe('Get List of Comments', ()=>{
        it('should give a list of comments', (done)=>{
            chai.request(app)
             .get('/comments/lists')
             .set('token', tokenTest)
             .end((err,res)=>{
                 expect(res).to.have.status(200)
                 expect(res.body.data).to.be.an('array')
                 expect(res.body.data).to.have.lengthOf(1)   
                 done()
             })
        })
    })

    describe('Delete comment', () =>{
        it('should delete a comment', (done)=>{
            chai.request(app)
             .delete(`/comments/${commentIdTest}`)
             .set('token',tokenTest)
             .end((err,res)=>{
                 expect(res).to.have.status(201)
                 expect(res.body.msg).to.equal('Comment Deleted')
                 expect(res.body.data).to.be.an('object')
                 expect(res.body.data).to.have.a.property('content')
                 expect(res.body.data).to.have.a.property('articleid')
                 expect(res.body.data).to.have.a.property('comentator')
                 done()
             })
        })
    })

    describe('Negative Test - Unauthorized user try to delete comment', ()=>{
        it('should give an error message', (done)=>{
            chai.request(app)
               .post('/user/register')
               .send({
                   name: 'Another Guy',
                   email: 'another@mail.com',
                   password: 'another'
               })
               .end((err,res)=>{
                   let otherToken = res.body.token
                   expect(res).to.have.status(201)
                   expect(res.body).to.have.property('token')
                   
                   // try to delete comment
                   chai.request(app)
                     .delete(`/comments/${commentIdTest}`)
                     .set('token',otherToken)
                     .end((err,res)=>{
                         expect(res).to.have.status(403)
                         expect(res.body.msg).to.equal('User is not authorized to delete comment')
                         done()
                     })   
               })
        })
    })

    describe('Negative Test - Unauthorized user try to delete comment without login', ()=>{
        it('should give an error message', (done)=>{
            chai.request(app)
            // try to delete comment
            chai.request(app)
                .delete(`/comments/${commentIdTest}`)
                .end((err,res)=>{
                    expect(res).to.have.status(401)
                    expect(res.body.msg).to.equal('ERROR TOKEN: User is not authorized')
                    done()
                })   
        })
    })

    afterEach((done)=>{
        // remove comment
        Commentary.remove()
          .then(comment =>{
            // remove article
            Article.remove()
                .then(article =>{
                    // remove user
                    User.remove()
                     .then(user =>{
                         done()
                     })
                     .catch(error =>{
                         console.log('ERROR delete all user ', error)
                         done()
                     })
                })
                .catch(error =>{
                    console.log('ERROR delete all article - afterEach ',error)
                    done()
                })
          })
          .catch(error =>{
              console.log('ERROR delete all comment - afterEach ',error)
              done()
          })
    })

})