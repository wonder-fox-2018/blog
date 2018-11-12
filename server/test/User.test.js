const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");

chai.use(chaiHttp);

describe("Register Validation User", () => {
  describe("POST => /users/register", () => {
    let dataNewUser = {
      fname: "Gusti",
      lname: "Andryean",
      email: "gstandryeanb@gmail.com",
      password: "asdasd123"
    };

    afterEach(() => {
      User.deleteMany({}).then(data => {});

      dataNewUser = {
        fname: "Gusti",
        lname: "Andryean",
        email: "gstandryeanb@gmail.com",
        password: "asdasd123"
      };
    });

    it("should return msg 'First name required' response error if fname is empty", done => {
      dataNewUser.fname = "";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("First name required");
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Email required' response error if email is empty", done => {
      dataNewUser.email = "";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Email required");
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Password required' response error if password is empty", done => {
      dataNewUser.email = "gstandryeanb@gmail.com";
      dataNewUser.password = "";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Password required");
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Password is combination beetween number and char' response error if input asdasd", done => {
      dataNewUser.password = "asdasd";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "Password is combination beetween number and char"
          );
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Password is combination beetween number and char' response error if input '123123'", done => {
      dataNewUser.password = "123123";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "Password is combination beetween number and char"
          );
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Password length must be greater than 5' response error if password length must be less than 6", done => {
      dataNewUser.password = "123as";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "Password length must be greater than 5"
          );
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Password is combination beetween number and char' response error if input 'asdasd12*%3' ", done => {
      dataNewUser.password = "asdasd12*%3";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "Password is combination beetween number and char"
          );
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Email is invalid' if input 'gstandryean.com' ", done => {
      dataNewUser.password = "asdasd123";
      dataNewUser.email = "gstandryean.com";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Email is invalid");
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Email is invalid' response error if input 'gsta.comndry@ean' ", done => {
      dataNewUser.email = "gsta.comndry@ean";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Email is invalid");
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'First name length must be greater than 2' if fname length must greater than 2 ", done => {
      dataNewUser.fname = "a";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "First name length must be greater than 2"
          );
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return 'First name must be contained with characther only' response error if input contains number ", done => {
      dataNewUser.fname = "aan4";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "First name must be contained with characther only"
          );
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return response success if lname not filled ", done => {
      dataNewUser.fname = "Gusti";
      dataNewUser.lname = "";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            `success creating new account with email ${dataNewUser.email}`
          );
          expect(res.body.status).to.equal("success");
          done();
        });
    }).timeout(3000)

    it("should return msg 'Last name length must be greater than 2' response error if lname length must be greater than 2 if input 'a' ", done => {
      dataNewUser.lname = "a";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "Last name length must be greater than 2"
          );
          expect(res.body.status).to.equal("failed");
          done();
        });
    });

    it("should return msg 'Last name must be contained with characther only' response error if  input ' a32'", done => {
      dataNewUser.lname = "a32";
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "Last name must be contained with characther only"
          );
          expect(res.body.status).to.equal("failed");
          done();
        });
    });
  });
});


describe("Register create data", () => {
  describe("POST => /users/register", () => {
    let dataNewUser = {
      fname: "Gusti",
      lname: "Andryean",
      email: "gstandryeanb@gmail.com",
      password: "asdasd123"
    };

    afterEach(() => {
      User.deleteMany({}).then(data => {});

      dataNewUser = {
        fname: "Gusti",
        lname: "Andryean",
        email: "gstandryeanb@gmail.com",
        password: "asdasd123"
      };
    });

    it("should return response with properties status, message, and data new user if data complete", done => {
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("fname");
          expect(res.body.data).to.have.property("lname");
          expect(res.body.data).to.have.property("email");
          expect(res.body.data).to.have.property("password");
          expect(res.body.data.fname).to.equal(dataNewUser.fname);
          expect(res.body.data.lname).to.equal(dataNewUser.lname);
          expect(res.body.data.email).to.equal(dataNewUser.email);
          expect(res.body.data.password).to.equal(dataNewUser.password);
          expect(res.body.status).to.equal("success");
          expect(res.body.message).to.equal(
            `success creating new account with email ${dataNewUser.email}`
          );
          done();
        }).timeout(5000)
    })
  })
})

describe('Registration with same email', () => {
  describe('POST => /users/register', () => {
    let dataNewUser = {
      fname: "Gusti",
      lname: "Andryean",
      email: "gstandryeanb@gmail.com",
      password: "asdasd123"
    }

    before(() => {
      let user = new User(dataNewUser)

      user.save().then(data => {})
    })

    after(() => {
      User.deleteMany({}).then(data => {})
    })

    it("should return msg 'Email already taken' response error if input with same email with another user ", done => {
      chai
        .request(app)
        .post("/users/register")
        .send(dataNewUser)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("message");
          expect(res.body.status).to.equal("failed");
          expect(res.body.message).to.equal("Email already taken");
          done()
        })
    }).timeout(500)
  })
})

describe("Login Verification", () => {
  describe("POST => /users/login", () => {
    let dataLogin = {
      email: "gstandryeanb@gmail.com",
      password: "asdasd123"
    }

    after(function () {
      User.deleteMany({}).then(data => {})
    })

    before(function () {
      let dataNewUser = {
        fname: "Gusti",
        lname: "Andryean",
        email: "gstandryeanb@gmail.com",
        password: "asdasd123"
      }

      let user = new User(dataNewUser)

      user.save().then(data => {})
    });

    it("should return msg 'wrong password or email' if password input wrong", (done) => {
      dataLogin.password = 'asdasd12'
      chai
        .request(app)
        .post("/users/login")
        .send(dataLogin)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          expect(res.body.status).to.equal('failed');
          expect(res.body.message).to.equal('wrong password or email');
          done();
        });
    })

    it("should return msg 'user not found' if user not registered", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          email: 'gstandryeanz@mail.com',
          password: 'asdasd123'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          expect(res.body.status).to.equal('failed');
          expect(res.body.message).to.equal('user not found');
          done();
        });
    });
  });
});

describe('Login Success', () => {
  describe('POST =>  /users/login', () => {

    before(() => {
      let dataNewUser = {
        fname: "Gusti",
        lname: "Andryean",
        email: "gstandryeanb@gmail.com",
        password: "asdasd123"
      }

      let user = new User(dataNewUser)

      user.save().then(data => {})
    });

    after(() => {
      User.deleteMany({}).then(data => {})
    })

    it("should return token if user login succesfully", done => {

      let dataLogin = {
        email: "gstandryeanb@gmail.com",
        password: "asdasd123"
      }

      chai
        .request(app)
        .post("/users/login")
        .send(dataLogin)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('token');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  })
})

describe('Get current online user data', () => {
  describe('GET => /users', () => {

    let token = ''

    before(function () {
      let dataNewUser = {
        fname: "Gusti",
        lname: "Andryean",
        email: "gstandryeanb@gmail.com",
        password: "asdasd123"
      }

      let user = new User(dataNewUser)

      return new Promise(resolve => {
        user.save().then(data => {
          token = jwt.sign({
            id: data._id,
            fname: data.fname
          }, process.env.JWT_HASH)
          resolve()
        })
      })

    });

    after(function () {
      User.deleteMany({}).then(data => {})
    })

    it('should return current user data with properties id and fname', done => {
      chai
        .request(app)
        .get('/users')
        .set({
          token
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('fname')
          done()
        })
    })
  })
})
