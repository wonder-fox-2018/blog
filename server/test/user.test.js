const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../app.js');
const User = require('../models/userModel.js');

let user = {
    name: 'sugita',
    email: 'sugita@mail.com',
    password: 'sugita'
}

let token;


// USER REGISTER
describe('User Register API Test', function() {
    before(function(done) {
        User.deleteOne({email: 'sugita@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        User.deleteOne({email: 'sugita@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    it('should return status 201 and a success message', function(done) {
        chai.request(app)
            .post('/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('message');
                done();
            });
    });

    it('should return status 500 if name is an empty string', function(done) {
        user.name = ''
        chai.request(app)
            .post('/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('should return status 500 if email is an empty string', function(done) {
        user.name = 'sugita'
        user.email = ''
        chai.request(app)
            .post('/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('should return status 500 if password is an empty string', function(done) {
        user.email = 'sugita@mail.com'
        user.password = ''
        chai.request(app)
            .post('/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                expect(res.body).to.equal("User validation failed: password: Password is required");
                done();
            });
    });

    it('should return status 500 if password length is less than 4', function(done) {
        user.password = 'aaa'
        chai.request(app)
            .post('/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                expect(res.body).to.equal("User validation failed: password: Min characters length is 4");
                done();
            });
    });

    it('should return status 500 if password length is longer than 10', function(done) {
        user.password = '1234567891011'
        chai.request(app)
            .post('/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                expect(res.body).to.equal("User validation failed: password: Max characters length is 10");
                done();
            });
    });
});


// USER LOGIN
describe('User Login API Test', function() {
    before(function(done) {
        User.create({
            name: 'sugita',
            email: 'sugita@mail.com',
            password: 'sugita'
        })
            .then(function(user) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        User.deleteOne({email: 'sugita@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    it('should return status 201 and a token', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                email: 'sugita@mail.com',
                password: 'sugita'
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should return status 400 if email is invalid or empty string', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                email: '',
                password: 'sugita'
            })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').to.equal('Wrong username or password');
                done();
            });
    });

    it('should return status 400 if password is invalid or empty string', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                email: 'sugita@mail.com',
                password: 'aa'
            })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').to.equal('Wrong username or password');
                done();
            });
    });
});


// GET USER PROFILE
describe('User Get Profile Data API Test', function() {
    before(function(done) {
        User.create({
            name: 'sugita',
            email: 'sugita@mail.com',
            password: 'sugita'
        })
            .then(function(user) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        User.deleteOne({email: 'sugita@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    // only to get token to be used in the next it
    it('should return status 201 and a token', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                email: 'sugita@mail.com',
                password: 'sugita'
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should return status 201 and user profile data', function(done) {
        chai.request(app)
            .get('/users')
            .set('access-token', token)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('password');
                done();
            });
    });
});

