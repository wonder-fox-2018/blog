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
                             userid: userIdTest
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