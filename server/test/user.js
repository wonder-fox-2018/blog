process.env.NODE_ENV = 'test'
var app  = require('../app.js')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect
var User = require('../models/User')

chai.use(chaiHttp)

describe('Users', () => {
  
  beforeEach((done) => {
    User.create({name: 'Tono', email: 'tono@mail.com', password: '123456'})
      .then(() => {
        done()
      })
  })
  
  afterEach((done) => {
    User.remove({}, () => {
      done()
    })
  })
  
  it('POST /users with empty and wrong email must be validate',(done)=>{
      chai.request(app)
      .post('/users')
      .send({name: 'Bimo', email: '', password: '12345'})
      .end((err, result) => {
        expect(result).to.have.status(500)
        expect(result.body).to.have.property('error')
        done()
      })
  })

  it('POST /users with empty password or password length<6 must be validate',(done)=>{
     chai.request(app)
     .post('/users')
     .send({name:'Bimo',email:'bimo@mail.com',password:'123'})
     .end((err,result)=>{
       expect(result).to.have.status(500)
       expect(result.body).to.have.property('error')
       expect(result.body.error).to.equals("User validation failed: password: Password should be between 6 and 16 characters")
       done()
     })
  })

  it('POST /users should return new user', (done) => {
    chai.request(app)
      .post('/users')
      .send({name: 'Bima', email: 'bima@mail.com', password: '123456'})
      .end((err, result) => {
        expect(result).to.have.status(201)
        expect(result.body).to.have.property('name')
        expect(result.body).to.have.property('email')
        done()
      })
  })
  
  it('POST /users/login should return user data', (done) => {    
    chai.request(app)
      .post('/users/login')
      .send({email: 'tono@mail.com', password: '123456'})
      .end((err, result) => {
        expect(result).to.have.status(200)
        expect(result.body).to.have.property('token')
        expect(result.body).to.have.property('id')
        expect(result.body.email).to.equal('tono@mail.com')
        done()
      })
  })

 
  
})