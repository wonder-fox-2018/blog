const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../app.js');
const User = require('../models/user.js');
require('dotenv').config()

let id = ''
let token = ''
describe('GET User', function(){
    beforeEach(function(done){
        User.create({username: 'zurashiro', email: 'zurashiro@mail.com', password: 'zurashiro'})
        .then(() => {
          User.findOne({email: 'zurashiro@mail.com'})
            .then(user => {
              let objUser = {
                id:user._id,
                username: user.username,
                email: user.email,
                role: user.role
              }
              
              token = jwt.sign(objUser, process.env.SECRET)
              userId = String(objUser.id)
            })
        })
    });
    afterEach(function(done){
        User.remove({}, function(done){
            done()
        });
    });

    it('/POST /users/login it should get Token and users data', function(){
        chai.request(app)
        .post('/users/login')
        .send({
            email : 'zurashiro@mail.com',
            password : 'zurashiro'
        })
        .end(function(req, res){
            console.log('ini token',token)
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.property('token')
            expect(res.body).to.be.an('object').to.have.property('username')
            expect(res.body).to.be.an('object').to.have.property('message')

            expect(res.body.username).to.equal('zurashiro')
            expect(res.body.message).to.equal('login Success')
            console.log(res.body)
            token =res.body.token
        })
    })
    console.log('ini token',token)
    it('/GET /users/show/profile it should get users profile data', function(){
        chai.request(app)
        .get('/users/show/profile')
        .set('token', token)
        .end(function(req, res){
            console.log('ini token',token)
            console.log('ini response', res.status)
            expect(res).to.have.status(200)
        })
    })
    it('/GET /users/show it should get all users data', function(done){
        chai.request(app)
        .get('/users/show')
        .end(function(err, res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object').to.have.property('users')
            expect(res.body).to.be.an('object').to.have.property('message')
            expect(res.body.users[0]).to.have.property('username')
            expect(res.body.users[0]).to.have.property('email')
            expect(res.body.users[0]).to.have.property('password')
            expect(res.body.users[0]).to.have.property('role')
            expect(res.body.users[0]).to.have.property('__v')

            expect(res.body.users[0].username).to.equal('zurashiro')
            expect(res.body.users[0].email).to.equal('zurashiro@mail.com')
            expect(res.body.users[0].role).to.equal('user')
            done()
        })
    })
})