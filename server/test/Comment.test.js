const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");
const Article = require("../models/articleModel");
const Category = require('../models/categoryModel')
const Comment = require('../models/commentModel')

chai.use(chaiHttp);

describe('Comments', () => {
  describe('POST => comments/', () => {

    let categoryId = ''
    let userId1 = ''
    let token1 = ''
    let articleId1 = ''
    let userId2 = ''
    let token2 = ''
    let articleId2 = ''

    before(done => {

      let user1 = {
        fname: 'usersatu',
        lname: 'usersatu',
        email: 'user1@gmal.com',
        password: 'asdasd123'
      }

      let user2 = {
        fname: 'userdua',
        lname: 'userdua',
        email: 'user2@gmal.com',
        password: 'asdasd123'
      }

      let categoryData = {
        name: 'food'
      }

      let category = new Category(categoryData)

      category.save()
        .then(data => {
          categoryId = data._id
        })

      let user = new User(user1)

      user.save()
        .then(data => {
          token1 = jwt.sign({
            id: data._id,
            fname: data.fname,
            role: data.role
          }, process.env.JWT_HASH)
          userId1 = data._id

          user = new User(user2)

          user.save()
            .then(data => {
              token2 = jwt.sign({
                id: data._id,
                fname: data.fname,
                role: data.role
              }, process.env.JWT_HASH)
              userId2 = data._id
              done()
            })
        })
    })

    beforeEach(done => {
      let article1 = {
        title: 'title1',
        description: 'title1',
        categoryId: categoryId
      }

      let article2 = {
        title: 'title2',
        description: 'title2',
        categoryId: categoryId
      }

      let article = new Article(article1)

      article.save()
        .then(data => {
          articleId1 = data._id

          article = new Article(article2)

          article.save()
            .then(data => {
              articleId2 = data._id
              done()
            })
        })

    })

    afterEach(done => {
      Comment.deleteMany({}).then(data => {})
      Article.deleteMany({})
        .then(data => {
          done()
        })
    })

    after(done => {
      User.deleteMany({}).then(data => {})
      Category.deleteMany({}).then(data => {
        done()
      })
    })

    it(`should return msg creating comment on article id <article Id> success`, done => {
      let commentId = ''
      chai
        .request(app)
        .post(`/comment/${articleId1}`)
        .send({
          body: 'test1'
        })
        .set({
          token: token1
        })
        .end((err, res) => {
          commentId = res.body.data._id
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('data')
          expect(res.body.message).to.equal(`creating comment on article with id ${articleId1} success`)
          expect(res.body.data).to.have.property('body')
          expect(res.body.data.body).to.equal('test1')
          expect(res.body.data.userId).to.equal(String(userId1))
          expect(res.body.data.articleId).to.equal(String(articleId1))

          chai
            .request(app)
            .get(`/article/${articleId1}`)
            .end((err, res) => {
              expect(res.body.data.commentId[0]).to.equal(String(commentId))
              done()
            })
        })

    })
  })
})
