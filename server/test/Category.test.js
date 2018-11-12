const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");
const Article = require("../models/articleModel");
const Category = require('../models/categoryModel')

chai.use(chaiHttp);

describe('Category', () => {
  describe('POST => /category', () => {
    let tokenUser = ''
    let userId = ''

    let tokenAdmin = ''
    let adminId = ''
    let categoryName = 'food'

    beforeEach((done) => {
      let admin = {
        fname: "admin",
        lname: "admin",
        email: "admin@gmail.com",
        password: "asdasd123",
        role: "admin"
      }

      let user = {
        fname: "user",
        lname: "user",
        email: "user@gmail.com",
        password: "asdasd123"
      }

      user = new User(user)

      user.save().then(data => {
        tokenUser = jwt.sign({
          id: data._id,
          fname: data.fname,
          role: data.role
        }, process.env.JWT_HASH)
        userId = data._id
      })

      user = new User(admin)

      user.save().then(data => {
        tokenAdmin = jwt.sign({
          id: data._id,
          fname: data.fname,
          role: data.role
        }, process.env.JWT_HASH)
        adminId = data._id
        done()
      })

    })

    afterEach((done) => {
      User.deleteMany({}).then(data => {})
      Category.deleteMany({}).then(data => {
        done()
      })
    })

    it(`should return msg 'creating category ${categoryName} success' if creator role is Admin`, (done) => {
      chai
        .request(app)
        .post('/category')
        .send({
          name: categoryName
        })
        .set({
          token: tokenAdmin
        })
        .end((req, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('data')
          expect(res.body.message).to.equal(`creating category ${categoryName} success`)
          expect(res.body.data.name).to.equal(`${categoryName}`)
          done()
        })
    })

    it("should return msg 'You'r not authorized for do this action' if creator role is user", done => {
      chai
        .request(app)
        .post('/category')
        .send({
          name: categoryName
        })
        .set({
          token: tokenUser
        })
        .end((req, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal(`You'r not authorized for do this action`)
          done()
        })
    })
  })
})
