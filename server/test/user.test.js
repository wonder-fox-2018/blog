

const chaiHttp = require('chai-http')
const chai = require('chai');
const app = require('../app');
const User = require('../models/user');


chai.use(chaiHttp);

var assert = require('chai').assert;


describe('post /register', function () {

  let dummy = {
    first_name: 'michael',
    last_name: 'scott',
    email: 'user@gmail.com',
    password: 'hello29qwfcw8!'
  }

  beforeEach(function (done) {
    User.deleteOne({email: 'user@gmail.com'}).then((result) => {

      done();
    }).catch((err) => {

    });

    dummy = {
      first_name: 'michael',
      last_name: 'scott',
      email: 'user@gmail.com',
      password: 'hello29qwfcw8!!'
    }
  })

  it(' should return status 201 when all data is valid', (done) => {

    chai.request(app)
      .post('/register')

      .send(
        dummy
      ).end((err, res) => {
        
        assert.equal(res.status, 201);

        done();
      })
  })

  it(' should return status 400 if first name is empty', (done) => {

    dummy.first_name = '';
    chai.request(app)
      .post('/register')
      .type('form')
      .send(
        dummy
      ).end((err, res) => {
        assert.equal(res.status, 400);
        done();
      })
  })

  it(' should return status 400 if last name is empty', (done) => {

    dummy.last_name = '';
    chai.request(app)
      .post('/register')
      .type('form')
      .send(
        dummy
      ).end((err, res) => {
        assert.equal(res.status, 400);
        done();
      })
  })



  it(' should return status 400 if password is empty', (done) => {
    dummy.password = '';
    chai.request(app)
      .post('/register')
      .type('form')
      .send(
        dummy
      ).end((err, res) => {
        assert(res.status, 400);
        done();
      })
  })

  it(' should return status 400 if password length is less than 7', (done) => {
    dummy.password = '12ae';
    chai.request(app)
      .post('/register')
      .type('form')
      .send(
        dummy
      ).end((err, res) => {
        assert.equal(res.status, 400);
        done();
      })
  })

  it(' should return status 400 if password contains a whitespace ', (done) => {
    dummy.password = 'test4hicnl dwq@';
    chai.request(app)
      .post('/register')
      .type('form')
      .send(
        dummy
      ).end((err, res) => {
        assert.equal(res.status, 400);
        done();
      })
  })

  
  it(' should return status 400 if email is invalid', (done) => {
    dummy.email = '@hehe@haha';
    chai.request(app)
      .post('/register')
      .type('form')
      .send(
        dummy
      ).end((err, res) => {
        assert.equal(res.status, 400);
        done();
      })
  })


})

describe('POST /login', () => {
  beforeEach((done) => {
    User.create({
      first_name: 'michael',
      last_name: 'scott',
      email: 'userlogin@gmail.com',
      password: 'hello29qwfcw8!'
    }).then((result) => {
      done()
    }).catch((err) => {
      
    });
  });

  afterEach((done) => {
    User.deleteOne({email: 'userlogin@gmail.com'}).then((result) => {

      done();
    }).catch((err) => {

    });
  });

  it('should return status 201 if data is valid', (done) => {
    
    chai.request(app)
      .post('/login')
      .type('form')
      .send({
        email: 'userlogin@gmail.com',
        password: 'hello29qwfcw8!'
      }).end((err, res) => {
        assert.equal(res.status, 200);
        done();
      })
  });

  it('should, return status 400 if email is invalid', (done) => {
    chai.request(app)
      .post('/login')
      .type('form')
      .send({
        email: 'notuser@gmail.com',
        password: 'hello29qwfcw8!'
      }).end((err, res) => {
        assert.equal(res.status, 400);
        done();
      })
  });

  it('should, return status 400 if password is invalid', (done) => {
    chai.request(app)
      .post('/login')
      .type('form')
      .send({
        email: 'notuser@gmail.com',
        password: 'hellfcw8!'
      }).end((err, res) => {
        assert.equal(res.status, 400);
        done();
      })
  });


})
