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

    it(`should return msg 'creating comment on article id <article Id> success' when successfully creating comment`, done => {
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

    it("should return msg 'Body of comment required' if user don't fill body comment when creating comment", done => {
      chai
        .request(app)
        .post(`/comment/${articleId1}`)
        .send({
          body: ''
        })
        .set({
          token: token1
        })
        .end((err, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Body of comment required')
          done()
        })
    })

    it("should return msg 'You need to login first' if user don't login when creating comment", done => {
      chai
        .request(app)
        .post(`/comment/${articleId1}`)
        .send({
          body: ''
        })
        .set({})
        .end((err, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('You need to login first')
          done()
        })
    })

    it("should return status '404' if user fill articleId input ", done => {
      chai
        .request(app)
        .post(`/comment/`)
        .send({
          body: 'testing'
        })
        .set({})
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })
  describe('PUT => /comment/:id', () => {

    let categoryId = ''
    let userId1 = ''
    let token1 = ''
    let articleId1 = ''
    let commentId1 = ''
    let userId2 = ''
    let token2 = ''
    let articleId2 = ''
    let commentId2 = ''

    before(done => {
      let dataCategory = {
        name: 'food'
      }

      let category = new Category(dataCategory)

      category.save()
        .then(data => {
          categoryId = data._id
          done()
        })
    })

    before(done => {
      let user1 = {
        fname: 'usersatu',
        lname: 'usersatu',
        email: 'user1@gmal.com',
        password: 'asdasd123'
      }

      let user = new User(user1)

      user.save()
        .then(data => {
          token1 = jwt.sign({
            id: data._id,
            fname: data.fname,
            role: data.role
          }, process.env.JWT_HASH)
          userId1 = data._id
          done()
        })
    })

    before(done => {
      let user2 = {
        fname: 'userdua',
        lname: 'userdua',
        email: 'user2@gmal.com',
        password: 'asdasd123'
      }

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

    before(done => {
      let article1 = {
        title: 'testing1',
        description: 'testing1',
        categoryId: categoryId
      }

      let article = new Article(article1)

      article.save()
        .then(data => {
          articleId1 = data._id
          done()
        })
    })

    before(done => {
      let article2 = {
        title: 'testing2',
        description: 'testing2',
        categoryId: categoryId
      }

      article = new Article(article2)

      article.save()
        .then(data => {
          articleId2 = data._id
          done()
        })
    })

    before(done => {
      let comment1 = {
        body: 'comment1',
        articleId: articleId1,
        userId: userId1
      }

      let comment = new Comment(comment1)

      comment.save()
        .then(data => {
          commentId1 = data._id
          done()
        })
    })

    before(done => {
      let comment2 = {
        body: 'comment2',
        articleId: articleId1,
        userId: userId1
      }

      comment = new Comment(comment2)

      comment.save()
        .then(data => {
          commentId2 = data._id
          done()
        })
    })

    after(done => {
      User.deleteMany({}).then(data => {
        done()
      })
    })

    after(done => {
      Article.deleteMany({}).then(data => {
        done()
      })
    })

    after(done => {
      Comment.deleteMany({}).then(data => {
        done()
      })
    })

    after(done => {
      Category.deleteMany({}).then(data => {
        done()
      })
    })

    it("should return msg 'failed updating comment' if user try to update another user comment ", done => {
      chai
        .request(app)
        .put(`/comment/${commentId1}`)
        .set({
          token: token2
        })
        .send({
          body: 'edited'
        })
        .end((err, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('failed updating comment')
          done()
        })
    })

    it("should return msg 'Body of comment required' if user try to update body with empty string ", done => {
      chai
        .request(app)
        .put(`/comment/${commentId1}`)
        .set({
          token: token1
        })
        .send({
          body: ''
        })
        .end((err, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Body of comment required')
          done()
        })
    })

    it("should return status '404' if user try to update body without inputing commentId", done => {
      chai
        .request(app)
        .put(`/comment/`)
        .set({
          token: token1
        })
        .send({
          body: ''
        })
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })

  describe('DELETE => /article/:id', () => {
    let categoryId = ''
    let userId1 = ''
    let token1 = ''
    let articleId1 = ''
    let commentId1 = ''
    let userId2 = ''
    let token2 = ''
    let articleId2 = ''
    let commentId2 = ''

    before(done => {
      let dataCategory = {
        name: 'food'
      }

      let category = new Category(dataCategory)

      category.save()
        .then(data => {
          categoryId = data._id
          done()
        })
    })

    before(done => {
      let user1 = {
        fname: 'usersatu',
        lname: 'usersatu',
        email: 'user1@gmal.com',
        password: 'asdasd123'
      }

      let user = new User(user1)

      user.save()
        .then(data => {
          token1 = jwt.sign({
            id: data._id,
            fname: data.fname,
            role: data.role
          }, process.env.JWT_HASH)
          userId1 = data._id
          done()
        })
    })

    before(done => {
      let user2 = {
        fname: 'userdua',
        lname: 'userdua',
        email: 'user2@gmal.com',
        password: 'asdasd123'
      }

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

    before(done => {
      let article1 = {
        title: 'testing1',
        description: 'testing1',
        categoryId: categoryId
      }

      let article = new Article(article1)

      article.save()
        .then(data => {
          articleId1 = data._id
          done()
        })
    })

    before(done => {
      let article2 = {
        title: 'testing2',
        description: 'testing2',
        categoryId: categoryId
      }

      article = new Article(article2)

      article.save()
        .then(data => {
          articleId2 = data._id
          done()
        })
    })

    before(done => {
      let comment1 = {
        body: 'comment1',
        articleId: articleId1,
        userId: userId1
      }

      let comment = new Comment(comment1)

      comment.save()
        .then(data => {
          commentId1 = data._id
          done()
        })
    })

    before(done => {
      let comment2 = {
        body: 'comment2',
        articleId: articleId1,
        userId: userId1
      }

      comment = new Comment(comment2)

      comment.save()
        .then(data => {
          commentId2 = data._id
          done()
        })
    })

    after(done => {
      User.deleteMany({}).then(data => {
        done()
      })
    })

    after(done => {
      Article.deleteMany({}).then(data => {
        done()
      })
    })

    after(done => {
      Comment.deleteMany({}).then(data => {
        done()
      })
    })

    after(done => {
      Category.deleteMany({}).then(data => {
        done()
      })
    })

    it("should return msg 'failed when deleting comment' if user try to delete another user comment ", done => {
      chai
        .request(app)
        .delete(`/comment/${commentId1}`)
        .set({
          token: token2
        })
        .end((err, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('failed when deleting comment')
          done()
        })
    })

    it("should return msg 'success when deleting comment with id <commentId>' if user try to delete another user comment ", done => {
      chai
        .request(app)
        .delete(`/comment/${commentId1}`)
        .set({
          token: token1
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal(`success deleting comment with id ${commentId1}`)
          done()
        })
    })

    it("should return status '404' if user try to delete without inserting commentId", done => {
      chai
        .request(app)
        .delete(`/comment`)
        .set({
          token: token1
        })
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })
})
