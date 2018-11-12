const app = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Article = require('../models/articleModel')
const Category = require('../models/categoryModel')
const Comment = require('../models/commentModel')

chai.use(chaiHttp)

describe('Article', function() {
  describe('Create Article', () => {
    describe('POST => /articles', () => {
      let token = ''
      let categoryId = ''
      let articleData = {
        title: 'TDD',
        description: 'Testing Driven Development',
        categoryId: String(categoryId)
      }

      before(done => {
        let categoryData = {
          name: 'food'
        }

        let category = new Category(categoryData)

        category.save().then(data => {
          categoryId = data._id
        })

        let dataNewUser = {
          fname: 'Gusti',
          lname: 'Andryean',
          email: 'gstandryeanb@gmail.com',
          password: 'asdasd123'
        }

        let user = new User(dataNewUser)

        user.save().then(data => {
          token = jwt.sign(
            {
              id: data._id,
              fname: data.fname
            },
            process.env.JWT_HASH
          )
          done()
        })
      })

      beforeEach(done => {
        articleData = {
          title: 'TDD',
          description: 'Testing Driven Development',
          categoryId: categoryId
        }
        done()
      })

      after(done => {
        User.deleteMany({}).then(data => {})
        Article.deleteMany({}).then(data => {})
        Category.deleteMany({}).then(data => {})
        done()
      })

      it("should return msg 'Title required' if title is empty ", done => {
        articleData.title = ''
        chai
          .request(app)
          .post('/article')
          .send(articleData)
          .set({
            token
          })
          .end((req, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Title required, description')
            done()
          })
      }).timeout(500)

      it("should return msg 'Description required' if description is empty ", done => {
        articleData.description = ''
        chai
          .request(app)
          .post('/article')
          .send(articleData)
          .set({
            token
          })
          .end((req, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Description required')
            done()
          })
      }).timeout(500)

      it("should return msg 'Category required' if categoryId is empty ", done => {
        articleData.categoryId = ''
        chai
          .request(app)
          .post('/article')
          .send(articleData)
          .set({
            token
          })
          .end((req, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Category required')
            done()
          })
      }).timeout(500)

      it("should return msg 'You need to login first' if user not login and create article", done => {
        chai
          .request(app)
          .post('/article')
          .send(articleData)
          .set({})
          .end((req, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('You need to login first')
            done()
          })
      }).timeout(500)

      it("should return msg 'Title length must be less than 35 char' if user input title with 35 char", done => {
        chai
          .request(app)
          .post('/article')
          .send({
            title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            description: 'testing'
          })
          .set({
            token: token
          })
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Title length must be less than 35 char')
            done()
          })
      }).timeout(500)

      it("should return msg 'creating article success' if creating data success", done => {
        chai
          .request(app)
          .post('/article')
          .send(articleData)
          .set({
            token: token
          })
          .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('creating article success')
            expect(res.body.data.title).to.equal(articleData.title)
            done()
          })
      }).timeout(500)
    })
  })

  describe('Update Article', () => {
    describe('PUT => /articles/:id', () => {
      let token1 = ''
      let userId1 = ''
      let token2 = ''
      let userId2 = ''
      let articleId = ''
      let categoryId = ''

      let articleData = {
        title: 'first data',
        description: 'first data',
        categoryId: categoryId
      }

      before(done => {
        let categoryData = {
          name: 'food'
        }

        let category = new Category(categoryData)

        category.save().then(data => {
          categoryId = data._id
        })

        let dataNewUser = {
          fname: 'Gusti',
          lname: 'Andryean',
          email: 'gstandryeanb@gmail.com',
          password: 'asdasd123'
        }

        let user = new User(dataNewUser)

        user.save().then(data => {
          token1 = jwt.sign(
            {
              id: data._id,
              fname: data.fname
            },
            process.env.JWT_HASH
          )
          userId1 = data._id
        })

        dataNewUser = {
          fname: 'Harles',
          lname: 'Kocak',
          email: 'Harles@gmail.com',
          password: 'asdasd123'
        }

        user = new User(dataNewUser)

        user.save().then(data => {
          token2 = jwt.sign(
            {
              id: data._id,
              fname: data.fname
            },
            process.env.JWT_HASH
          )
          userId2 = data._id
          done()
        })
      })

      beforeEach(done => {
        let articleDataInput = {
          title: 'first data',
          description: 'first data',
          userId: String(userId1),
          categoryId: categoryId
        }

        let article = new Article(articleDataInput)
        article.save().then(data => {
          articleId = data._id
          articleData = {
            title: 'first data',
            description: 'first data',
            categoryId: categoryId
          }
          done()
        })
      })

      afterEach(done => {
        articleData = {
          title: 'first data',
          description: 'first data',
          categoryId: categoryId
        }
        Article.deleteMany({}).then(data => {
          done()
        })
      })

      after(done => {
        User.deleteMany({}).then(data => {
          done()
        })
      })

      it("should return msg 'failed updating article' if user updating another user article", done => {
        chai
          .request(app)
          .put(`/article/${articleId}`)
          .send(articleData)
          .set({
            token: token2
          })
          .end((req, res) => {
            expect(res).to.have.status(403)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('failed updating article')
            done()
          })
      }).timeout(500)

      it("should return msg 'You need to login first' if user updating without login", done => {
        chai
          .request(app)
          .put(`/article/${articleId}`)
          .send(articleData)
          .end((req, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('You need to login first')
            done()
          })
      }).timeout(500)

      it("should return msg 'Title required' if user updating with empty string to title", done => {
        articleData.title = ''
        chai
          .request(app)
          .put(`/article/${articleId}`)
          .send(articleData)
          .set({
            token: token1
          })
          .end((req, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Title required')
            done()
          })
      }).timeout(500)

      it("should return msg 'Description required' if user updating with empty string to description", done => {
        articleData.description = ''
        chai
          .request(app)
          .put(`/article/${articleId}`)
          .send(articleData)
          .set({
            token: token1
          })
          .end((req, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Description required')
            done()
          })
      }).timeout(500)

      it(`should return msg 'success updating article with id ${articleId}' if updating data success`, done => {
        articleData.title = 'edited'
        chai
          .request(app)
          .put(`/article/${articleId}`)
          .send(articleData)
          .set({
            token: token1
          })
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal(`success updating article with id ${articleId}`)
            done()
          })
      }).timeout(500)
    })
  })

  describe('Delete Article', () => {
    describe('DELETE => /article/:id', () => {
      let token1 = ''
      let userId1 = ''
      let token2 = ''
      let userId2 = ''
      let articleId = ''
      let categoryId = ''

      before(done => {
        let categoryData = {
          name: 'food'
        }

        let category = new Category(categoryData)

        category.save().then(data => {
          categoryId = data._id
        })

        let dataNewUser = {
          fname: 'Gusti',
          lname: 'Andryean',
          email: 'gstandryeanb@gmail.com',
          password: 'asdasd123'
        }

        let user = new User(dataNewUser)

        user.save().then(data => {
          token1 = jwt.sign(
            {
              id: data._id,
              fname: data.fname
            },
            process.env.JWT_HASH
          )
          userId1 = data._id
        })

        dataNewUser = {
          fname: 'Harles',
          lname: 'Kocak',
          email: 'Harles@gmail.com',
          password: 'asdasd123'
        }

        user = new User(dataNewUser)

        user.save().then(data => {
          token2 = jwt.sign(
            {
              id: data._id,
              fname: data.fname
            },
            process.env.JWT_HASH
          )
          userId2 = data._id
          done()
        })
      })

      beforeEach(done => {
        let articleData = {
          title: 'first data',
          description: 'first data',
          userId: String(userId1),
          categoryId
        }

        let article = new Article(articleData)
        article.save().then(data => {
          articleId = data._id
          done()
        })
      })

      afterEach(done => {
        Article.deleteMany({}).then(data => {
          done()
        })
      })

      after(done => {
        User.deleteMany({}).then(data => {
          done()
        })
      })

      it("should return 'failed deleting article' if user deleting another user article", done => {
        chai
          .request(app)
          .delete(`/article/${articleId}`)
          .set({
            token: token2
          })
          .end((err, res) => {
            expect(res).to.have.status(403)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('failed deleting article')
            done()
          })
      }).timeout(500)

      it(`should return 'success deleting article with id ${String(
        articleId
      )}' if success deleting article`, done => {
        chai
          .request(app)
          .delete(`/article/${articleId}`)
          .set({
            token: token1
          })
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal(`success deleting article with id ${articleId}`)
            done()
          })
      }).timeout(500)

      it("should return 'You need to login first' if user deleting article without login", done => {
        chai
          .request(app)
          .delete(`/article/${articleId}`)
          .set({})
          .end((err, res) => {
            expect(res).to.have.status(500)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('You need to login first')
            done()
          })
      }).timeout(500)
    })
  })

  describe('Get Article', () => {
    describe('GET => /article', () => {
      let categoryId = ''
      let token1 = ''
      let userId1 = ''
      let articleId1 = ''
      let token2 = ''
      let userId2 = ''
      let articleId2 = ''
      let token3 = ''
      let userId3 = ''
      let articleId3 = ''

      before(done => {
        let categoryData = {
          name: 'food'
        }
        let category = new Category(categoryData)

        category.save().then(data => {
          categoryId = data._id
          done()
        })
      })

      beforeEach(done => {
        let user1 = {
          fname: 'Gustisatu',
          lname: 'Andryeansatu',
          email: 'gstandryeanb1@gmail.com',
          password: 'asdasd111'
        }
        let articleData1 = {
          title: 'first data',
          description: 'first data',
          categoryId
        }

        let user2 = {
          fname: 'Gustidua',
          lname: 'Andryeandua',
          email: 'gstandryeanb2@gmail.com',
          password: 'asdasd222'
        }
        let articleData2 = {
          title: 'second data',
          description: 'second data',
          categoryId
        }

        let user3 = {
          fname: 'Gustitiga',
          lname: 'Andryeantiga',
          email: 'gstandryeanb3@gmail.com',
          password: 'asdasd333'
        }
        let articleData3 = {
          title: 'third data',
          description: 'third data',
          categoryId
        }

        let user = new User(user1)

        user.save().then(data => {
          token1 = jwt.sign(
            {
              id: data._id,
              fname: data.fname
            },
            process.env.JWT_HASH
          )
          userId1 = data._id
        })

        user = new User(user2)

        user.save().then(data => {
          token2 = jwt.sign(
            {
              id: data._id,
              fname: data.fname
            },
            process.env.JWT_HASH
          )
          userId2 = data._id
        })

        user = new User(user3)

        user.save().then(data => {
          token3 = jwt.sign(
            {
              id: data._id,
              fname: data.fname
            },
            process.env.JWT_HASH
          )
          userId3 = data._id
        })

        article = new Article(articleData1)
        article.save().then(data => {
          articleId1 = data._id
        })

        article = new Article(articleData2)
        article.save().then(data => {
          articleId2 = data._id
        })

        article = new Article(articleData3)
        article.save().then(data => {
          articleId3 = data._id
          done()
        })
      })

      afterEach(done => {
        User.deleteMany({}).then(data => {})
        Article.deleteMany({}).then(data => {
          done()
        })
      })

      after(done => {
        Category.deleteMany({}).then(data => {
          done()
        })
      })

      it('should return article data with equal input params', done => {
        chai
          .request(app)
          .get(`/article/${articleId1}`)
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('object')
            expect(res.body.data._id).to.equal(String(articleId1))
            done()
          })
      }).timeout(500)

      it('should return all article data even user not login', done => {
        chai
          .request(app)
          .get('/article')
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('array')
            expect(res.body.data).to.have.lengthOf(3)
            done()
          })
      }).timeout(500)
    })
  })

  describe('DELETE => /article/:id', done => {
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

      category.save().then(data => {
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

      user.save().then(data => {
        token1 = jwt.sign(
          {
            id: data._id,
            fname: data.fname,
            role: data.role
          },
          process.env.JWT_HASH
        )
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

      user.save().then(data => {
        token2 = jwt.sign(
          {
            id: data._id,
            fname: data.fname,
            role: data.role
          },
          process.env.JWT_HASH
        )
        userId2 = data._id
        done()
      })
    })

    before(done => {
      let article1 = {
        title: 'testing1',
        description: 'testing1',
        categoryId: categoryId,
        userId: userId1
      }

      let article = new Article(article1)

      article.save().then(data => {
        articleId1 = data._id
        done()
      })
    })

    before(done => {
      let article2 = {
        title: 'testing2',
        description: 'testing2',
        categoryId: categoryId,
        userId: userId2
      }

      article = new Article(article2)

      article.save().then(data => {
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

      comment.save().then(data => {
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

      comment.save().then(data => {
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

    it('should remove all comment on the property and database if article got deleted', done => {
      chai
        .request(app)
        .delete(`/article/${articleId1}`)
        .set({
          token: token1
        })
        .end((err, res) => {
          expect(res).to.have.status(200)

          Comment.find({}).then(data => {
            expect(data).to.be.a('array')
            expect(data).to.have.lengthOf(0)
            done()
          })
        })
    })
  })
})
