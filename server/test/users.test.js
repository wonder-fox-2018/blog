const chai = require('chai')
const chaiHttp = require('chai-http')

const User = require('../models/users')
const app = require('../app')

const should = chai.should();
var assert = require('chai').assert;
var expect = require('chai').expect;

chai.use(chaiHttp)

describe('POST /users/signup', () => {

    it('it should post one user data', (done) => {
        chai.request(app)
            .post('/users/signup')
            .send({
                name: "chameleon",
                email: "chameleon@mail.com",
                password: "chameleon",
            })
            .end( (err, res) => {
                res.body.should.be.an('object').to.have.property('message')
                res.body.should.be.an('object').to.have.property('user')
                res.body.user.should.have.property('name')
                res.body.user.should.have.property('email')
                res.body.user.should.have.property('password')
                res.should.have.status(201)
                done()
            })
    })

    it('it should return token', (done) => {
        chai.request(app)
            .post('/users/signin')
            .send({
                email: "chameleon@mail.com",
                password: "chameleon",
            })
            .end( (err, res) => {
                res.body.should.have.property('token')
                res.should.have.status(201)
                done()
            })
    })

    after( (done) => {
        User.deleteMany({}, (err) => {
            done()
        })
    })
    
})