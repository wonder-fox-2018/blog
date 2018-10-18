var User = require('../models/user')

//Chai
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
let chaiHttp = require('chai-http');
let app = require('../app.js');
chai.use(chaiHttp);

describe('User', () => {
    let id = ''
    let newUser = {
        name: 'user',
        email: 'user@test.com',
        password: '123456'
    }
    beforeEach((done) => {
        User.create({
          name : "User2",
          email : "user2@test.com",
          password : '123456'
        })
        .then(data=>{
          id = data._id;
          done();
        })
        .catch(err=>{
          console.log(err);
        });
    });

    describe('/POST Register User', () => {
        it('Register/crete new user', function(done) {
            chai
            .request(app)
            .post('/users')
            .send(newUser)
            .end(function (err, res) {
                expect(res).to.have.status(201)
                res.body.should.have.property('name').eql(`user`)
                res.body.should.have.property('email').eql(`user@test.com`)
                res.body.should.have.property('password')
                done()
            })
        });
    });

    describe('/POST login user', () => {
        it('it should log in a users', (done) => {
        let user = {
            email : "user2@test.com",
            password : '123456'
        };
        chai.request(app)
            .post('/users/login')
            .send(user)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token');
            res.body.should.have.property('msg').eql('login success');
            done();
            });
        });
    });

    describe('/PUT Update user', () => {
        it('it should update user', (done) => {
        const user = {
            name : "user3",
            email : "user3@test.com"
        };
        chai.request(app)
            .put(`/users/${id}`)
            .send(user)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('msg').eql(`success updating user`);
            done();
            });
        });
    });

    afterEach(function (done) {
        User.remove({}, function (err) {
            done()
        })
    })
    



})