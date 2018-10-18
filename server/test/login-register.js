require("dotenv").config()
let hashPass = require("../helpers/hashPass")

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  app = require("../app"),
  expect = chai.expect,
  User = require("../models/users")

chai.use(chaiHttp)

describe("Success Register User", () => {

  let userData = {
    name: "John Doe",
    email: "johnDoe@mail.co",
    password: "john-123"
  }

  it("/POST register should return new object users", (done) => {
    chai
      .request(app)
      .post("/users")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a("object")
        expect(res.body.name).to.equal(userData.name)
        expect(res.body.email).to.equal(userData.email)
        expect(res.body.password).to.equal(hashPass(userData.password))
        expect(res.body.password).to.have.length.above(4)
        done()
      })
  })

  
  afterEach(done => {
    User.deleteOne({
      email: userData.email
    })
    .then(() => {
        done()
    })
    .catch(err => {
      console.log(err.message)
    })
  })
})

describe("Success Login User", () => {

  let userData = {
    name: "John Doe",
    email: "johnDoe@mail.co",
    password: "john-123"
  }
  
  beforeEach(done => {
    User.create(userData)
      .then(() => {
          done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it("/POST login should return token", (done) => {
    chai
      .request(app)
      .post("/users/login")
      .send({
        email: "johnDoe@mail.co",
        password: "john-123"
      })
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property('token')
        done()
      })
  })

  afterEach((done) => {
    User.deleteOne({
      email: userData.email
    }, (err) => {
      if (!err) {
        done()
      } else {
        console.log(err.message)
      }
    })
  })
})

//////////////////////////////////////////////////Error Handling////////////////////////////////////

describe("Failed Register User", () => {

  let userData = {
    name: "",
    email: "johnDoe@mail.co",
    password: "john-123"
  }

  it("/POST register password no name should return error", (done) => {
    chai
      .request(app)
      .post("/users")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('User validation failed: name: name is required')
        done()
      })
  })
})

describe("Failed Register User", () => {

  let userData = {
    name: "John Doe",
    email: "",
    password: "john-123"
  }

  it("/POST register password no email should return error", (done) => {
    chai
      .request(app)
      .post("/users")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('User validation failed: email: email is required')
        done()
      })
  })
})

describe("Failed Register User", () => {
  
  let userData = {
    name: "John Doe",
    email: "johnDoe@mail.co",
    password: "john-123"
  }

  beforeEach(done => {
    User.create(userData)
    .then(() => {
        done()
    })
    .catch(err => {
      console.log(err.message)
    })
  })
  
  it("/POST register password duplicate email should return error", (done) => {
    chai
      .request(app)
      .post("/users")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(500)
        expect(res.body.code).to.equal(11000)
        done()
      })
  })

  afterEach(done => {
    User.deleteOne({
      email: userData.email
    })
    .then(() => {
      done()
    })
    .catch(err => {
      console.log(err.message)
    })
  })
})

describe("Failed Register User", () => {

  let userData = {
    name: "John Doe",
    email: "johnDoe@mail.co",
    password: "john"
  }

  it("/POST register password length < 5 should return error", (done) => {
    chai
    .request(app)
    .post("/users")
    .send(userData)
    .end((err, res) => {
      expect(res).to.have.status(500)
      expect(res.body.message).to.equal('User validation failed: password: password min 5 character')
      done()
    })
  })
})

describe("Failed Register User", () => {

  let userData = {
    name: "John Doe",
    email: "johnDoe@mail.co",
    password: ""
  }
  
  it("/POST register password no password should return error", (done) => {
    chai
      .request(app)
      .post("/users")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('User validation failed: password: password is required')
        done()
      })
  })
})

describe("Failed Login User", () => {

  let userData = {
    name: "John Doe",
    email: "johnDoe@mail.co",
    password: "john-123"
  }
  
  beforeEach(done => {
    User.create(userData)
      .then(() => {
          done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it("/POST login email and password not match", (done) => {
    chai
      .request(app)
      .post("/users/login")
      .send({
        email: "johnDoe@mail.co",
        password: "john-12mungkin"
      })
      .end((err, res) => {
        expect(res).to.have.status(500)
        expect(res.body.message).to.equal('email and password didn\'t match')
        done()
      })
  })

  afterEach((done) => {
    User.deleteOne({
      email: userData.email
    }, (err) => {
      if (!err) {
        done()
      } else {
        console.log(err.message)
      }
    })
  })
})
