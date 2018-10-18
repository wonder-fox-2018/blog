process.env.DATA_TESTING = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
chai.use(chaiHttp);

const User = require("../models/user");

describe("USERS POST", function() {
  describe("users registration", function() {
    describe("user registration success", function() {
      let data = {
        name: "harles bayu angara",
        picture: "harles.jpg",
        gender: "male",
        email: "harles@gmail.com",
        password: "harles"
      };

      afterEach(function(done) {
        User.remove({}, function(err) {
          done();
        });
      });

      it("it expect if registrasi user success", function(done) {
        chai
          .request(app)
          .post("/users/register")
          .send(data)
          .end(function(err, res) {
            expect(res.body.user).to.have.property("name");
            expect(res.body.user).to.have.property("gender");
            expect(res.body.user).to.have.property("email");
            expect(res.body.user).to.have.property("password");
            expect(res.body.user)
              .to.have.property("name")
              .to.be.a("string");
            expect(res.body.user)
              .to.have.property("gender")
              .to.be.a("string");
            expect(res.body.user)
              .to.have.property("email")
              .to.be.a("string");
            expect(res.body.user)
              .to.have.property("password")
              .to.be.a("string");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal("registrasi success");
            expect(res).to.have.status(201);
            done();
          });
      });
    });

    describe("user registration failed", function() {
      let data = {
        name: "harles bayu angara",
        picture: "harles.jpg",
        gender: "male",
        email: "harles@gmail.com",
        password: "harles"
      };

      it("it expect if input is empty", function(done) {
        data.name = "";
        data.picture = "";
        data.gender = "";
        data.email = "";
        data.password = "";

        chai
          .request(app)
          .post("/users/register")
          .send(data)
          .end(function(err, res) {
            expect(res.body).to.have.property("err");
            expect(res.body).to.have.property("message");
            expect(res.body.err).to.have.property("errors");
            expect(res.body.err.errors).to.have.property("name");
            expect(res.body.err.errors).to.have.property("gender");
            expect(res.body.err.errors).to.have.property("email");
            expect(res.body.err.errors).to.have.property("password");
            expect(res.body.err.errors.name)
              .to.have.property("message")
              .to.equal("name is required");
            expect(res.body.err.errors.gender)
              .to.have.property("message")
              .to.equal("gender is required");
            expect(res.body.err.errors.email)
              .to.have.property("message")
              .to.equal("email is required");
            expect(res.body.err.errors.password)
              .to.have.property("message")
              .to.equal("password is required");
            expect(res).to.have.status(500);
            done();
          });
      });

      it("it expect if name input is integer or not string", function(done) {
        data.name = 1234;
        chai
          .request(app)
          .post("/users/register")
          .send(data)
          .end(function(err, res) {
            expect(res.body).to.have.property("err");
            expect(res.body.err).to.have.property("errors");
            expect(res.body.err.errors).to.have.property("name");
            expect(res.body.err.errors.name).to.have.property("message");
            expect(res.body.err.errors.name.message).to.equal(
              "name must be string"
            );
            done();
          });
      });

      it("it expect if gender input is not famale or male", function(done) {
        data.gender = "laki-laki";
        chai
          .request(app)
          .post("/users/register")
          .send(data)
          .end(function(err, res) {
            expect(res.body).to.have.property("err");
            expect(res.body.err).to.have.property("errors");
            expect(res.body.err.errors).to.have.property("gender");
            expect(res.body.err.errors.gender).to.have.property("message");
            expect(res.body.err.errors.gender.message).to.equal(
              "`" +
                `${data.gender}` +
                "`" +
                " is not a valid enum value for path `gender`."
            );
            done();
          });
      });

      it("it expect if length password less than 6 character", function(done) {
        data.password = "abcd";
        chai
          .request(app)
          .post("/users/register")
          .send(data)
          .end(function(err, res) {
            expect(res.body).to.have.property("err");
            expect(res.body.err).to.have.property("errors");
            expect(res.body.err.errors).to.have.property("password");
            expect(res.body.err.errors.password).to.have.property("message");
            expect(res.body.err.errors.password.message).to.equal(
              "password minimal length 6"
            );
            done();
          });
      });
    });
  });

  describe("users validation email", function() {
    beforeEach(function(done) {
      let dataUser = new User({
        name: "harles bayu angara",
        picture: "harles.jpg",
        gender: "male",
        email: "harles@gmail.com",
        password: "harles"
      });
      dataUser.save((err, res) => {
        done();
      });
    });

    afterEach(function(done) {
      User.remove({}, function(err) {
        done();
      });
    });

    it("it expect if email unique", function(done) {
      let data = {
        name: "harles bayu angara",
        picture: "harles.jpg",
        gender: "male",
        email: "harles@gmail.com",
        password: "harles"
      };

      chai
        .request(app)
        .post("/users/register")
        .send(data)
        .end(function(err, res) {
          expect(res.body.err).to.have.property("code");
          expect(res.body.err.code).to.equal(11000);
          done();
        });
    });
  });

  describe("users login", function() {
    beforeEach(function(done) {
      let dataUser = new User({
        name: "harles bayu angara",
        picture: "harles.jpg",
        gender: "male",
        email: "harles@gmail.com",
        password: "harles"
      });

      dataUser.save((err, res) => {
        done();
      });
    });

    afterEach(function(done) {
      User.remove({}, function(err) {
        done();
      });
    });

    let data = {
      email: "harles@gmail.com",
      password: "harles"
    };

    it("it expect if login success", function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(data)
        .end(function(err, res) {
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("token");
          expect(res).to.have.status(201);
          done();
        });
    });

    it("it expect if email false", function(done) {
      data.email = "bayu@mail.com";
      chai
        .request(app)
        .post("/users/login")
        .send(data)
        .end(function(err, res) {
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal(
            "you did not have account, please signup first"
          );
          expect(res).to.have.status(404);
          done();
        });
    });

    it("it expect if password false", function(done) {
      data.email = "harles@gmail.com";
      data.password = "123";
      chai
        .request(app)
        .post("/users/login")
        .send(data)
        .end(function(err, res) {
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("email and password didnt match");
          expect(res).to.have.status(500);
          done();
        });
    });
  });
});
