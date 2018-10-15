'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
chai.use(chaiHttp)
const expect = chai.expect

describe('Register User Testing', ()=>{
    it('should give a success message and a jwt token', (done)=>{
        chai.request(app)
         .post('/user/register')
         .send({
             name: 'Bamba',
             email: 'bamba@mail.com',
             password: 'bamba'
         })
         .end((err,res)=>{
             expect(res).to.have.status(201)
             expect(res.body).to.have.property('token')
             done()
         })
    })
})

describe('Login User Testing', ()=>{
    it('should give a success message and a jwt token', (done)=>{
        chai.request(app)
         .post('/user/login')
         .send({
             email: 'bamba@mail.com',
             password: 'bamba'
         })
         .end((err,res)=>{
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('token')
            done()
         })
    })
})

describe('Get Credentials User Testing', ()=>{
    it('should give a success message and user info', (done)=>{
        chai.request(app)
         .post('/user/login')
         .send({
             email: 'bamba@mail.com',
             password: 'bamba'
         })
         .end((err,res)=>{
             expect(res).to.have.status(201)
             expect(res.body).to.have.property('token')
             
             let token = res.body.token
             chai.request(app)
             .get('/users/credentials')
             .set('token',token)
             .end((err,res)=>{
                 expect(res).to.have.status(200)
                 expect(res.body).to.have.property('name')
                 expect(res.body.email).to.equal('bamba@mail.com')
                 done() 
             })
         })
    })
})

describe('Get Details User Testing', ()=>{
    it('should give a success message and user info', (done)=>{
        chai.request(app)
         .post('/user/login')
         .send({
             email: 'bamba@mail.com',
             password: 'bamba'
         })
         .end((err,res)=>{
             expect(res).to.have.status(201)
             expect(res.body).to.have.property('token')
             
             let token = res.body.token
             chai.request(app)
             .get('/users/details')
             .set('token',token)
             .end((err,res)=>{
                 expect(res).to.have.status(200)
                 expect(res.body.data).to.be.an('object')
                 expect(res.body.data.email).to.equal('bamba@mail.com')
                 done() 
             })
         })
    })
})

// Negative Test
describe('False Email When Register', ()=>{
    it('should give Error Message Please check your email', (done)=>{
        chai.request(app)
         .post('/user/register')
         .send({
             name: 'Bamba',
             email: 'bamba.com',
             password: 'bamba'
         })
         .end((err,res)=>{
             expect(res).to.have.status(400)
             expect(res.body).to.have.property('msg')
             expect(res.body.msg).to.equal('Please check your email')
             done()
         })
    })

    afterEach((done)=>{
        User.findOneAndRemove({
            email : 'bamba@mail.com'
        })
        .then( user =>{

            done()
        })
        .catch(error =>{
            console.log('ERROR After Each -->',error)
            done();
        })
    })
})



