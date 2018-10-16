const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const User = require('../models/users')
const app = require('../app')

const should = chai.should();

describe('User Sign Up (POST)', function () {

    afterEach(function (done) {
        User.deleteMany({}, function (err) {
            done()
        })
    })

    describe('post one user', function () {
        it('it should post one user data', function (done) {
            chai.request(app)
                .post('/users/signup')
                .send({
                    name: "chameleon",
                    email: "chameleon@mail.com",
                    password: "chameleon",
                })
                .end(function (err, res) {
                    res.body.should.be.an('object').to.have.property('message')
                    res.body.should.be.an('object').to.have.property('user')
                    res.body.user.should.have.property('name')
                    res.body.user.should.have.property('email')
                    res.body.user.should.have.property('password')
                    res.should.have.status(201)
                    done()
                })
        })
    })
})

describe('User Sign Up (POST)', function () {

    beforeEach(function (done) {
        User.create({
            name: "chameleon",
            email: "chameleon@mail.com",
            password: "chameleon",
        }, function (err) {
            done()
        })
    })

    afterEach(function (done) {
        User.deleteMany({}, function (err) {
            done()
        })
    })

    describe('post one user', function () {
        it('it should post one user data', function (done) {
            chai.request(app)
                .post('/users/signin')
                .send({
                    email: "chameleon@mail.com",
                    password: "chameleon",
                })
                .end(function (err, res) {
                    console.log(res.body)
                    done()
                })
        })
    })
})