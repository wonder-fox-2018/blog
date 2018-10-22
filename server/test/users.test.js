const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../app.js');
const User = require('../models/user.js');

let user = {
    username: 'zura',
    email: 'zura@mail.com',
    password: 'zura'
}

let admin = {
  username : 'kwonyuri',
  email : 'yuri@gmail.com',
  password : 'yuri'
}

let token;

describe('User Register API Test', function() {
    after(function(done) {
        User.deleteOne({email: 'zura@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    it('should return status 201 and a success message', function(done) {
        chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('message');
                done();
            });
    });

    it('should return status 500 if username is an empty string', function(done) {
        user.username = ''
        chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('should return status 500 if email is an empty string', function(done) {
        user.email = ''
        chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('should return status 500 if password is an empty string', function(done) {
        user.password = ''
        chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('should return status 500 if password length is less than 4', function(done) {
        user.password = 'aaa'
        chai.request(app)
            .post('/users/register')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });
});


// register admin 
describe('Admin Register API Test', function() {
  after(function(done) {
      User.deleteOne({email: 'yuri@mail.com'})
          .then(function(result) {
              done();
          })
          .catch(function(err) {
              console.log(err);
          });
  });

  it('should return status 201 and a success message', function(done) {
      chai.request(app)
          .post('/users/register/admin')
          .send(admin)
          .end(function(err, res) {
              expect(res).to.have.status(201);
              expect(res.body).to.have.property('success');
              expect(res.body).to.have.property('message');
              done();
          });
  });

  it('should return status 500 if username is an empty string', function(done) {
      admin.username = ''
      chai.request(app)
          .post('/users/register/admin')
          .send(admin)
          .end(function(err, res) {
              expect(res).to.have.status(500);
              done();
          });
  });

  it('should return status 500 if email is an empty string', function(done) {
      admin.email = ''
      chai.request(app)
          .post('/users/register/admin')
          .send(admin)
          .end(function(err, res) {
              expect(res).to.have.status(500);
              done();
          });
  });

  it('should return status 500 if password is an empty string', function(done) {
      admin.password = ''
      chai.request(app)
          .post('/users/register/admin')
          .send(admin)
          .end(function(err, res) {
              expect(res).to.have.status(500);
              done();
          });
  });

  it('should return status 500 if password length is less than 4', function(done) {
      admin.password = 'aaa'
      chai.request(app)
          .post('/users/register/admin')
          .send(admin)
          .end(function(err, res) {
              expect(res).to.have.status(500);
              done();
          });
  });
});

//login test

describe('User Login API Test', function() {
    before(function(done) {
        User.create({
            username: 'zura',
            email: 'zura@mail.com',
            password: 'zura'
        })
            .then(function(user) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        User.deleteOne({email: 'zura@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    it('should return status 200 and a token', function(done) {
        chai.request(app)
            .post('/users/login')
            .send({
                email: 'zura@mail.com',
                password: 'zura'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should return status 400 if email is invalid or empty string', function(done) {
        chai.request(app)
            .post('/users/login')
            .send({
                email: '',
                password: 'zura'
            })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').to.equal('Email and Password must be filled');
                done();
            });
    });

    it('should return status 400 if password is invalid or empty string', function(done) {
        chai.request(app)
            .post('/users/login')
            .send({
                email: 'zura@mail.com',
                password: 'aa'
            })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message').to.equal('Wrong email or password');
                done();
            });
    });
});

describe('User Get Profile Data API Test', function() {
    before(function(done) {
        User.create({
            username: 'zura',
            email: 'zura@mail.com',
            password: 'zura'
        })
            .then(function(user) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        User.deleteOne({email: 'zura@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    it('should return status 200 and a token', function(done) {
        chai.request(app)
            .post('/users/login')
            .send({
                email: 'zura@mail.com',
                password: 'zura'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should return status 200 and user profile data', function(done) {
        chai.request(app)
            .get('/users/show/profile')
            .set('token', token)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('username');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('password');
                done();
            });
    });
});
console.log(token)