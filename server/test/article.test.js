process.env.DATA_TESTING = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
chai.use(chaiHttp);

const User = require("../models/user");
const Article = require("../models/article");

describe("ARTICLES POST", function() {
  describe("artile create", function() {
    let dataUser = new User({
      name: "harles bayu angara",
      picture: "harles.jpg",
      gender: "male",
      email: "harles@gmail.com",
      password: "harles"
    });

    let dataLogin = {
      email: "harles@gmail.com",
      password: "harles"
    };

    let dataArticle = {
      title: "Article 1",
      content: "Desc Article 1",
      picture: "article1.jpg"
    };
    let token = "";
    after(function(done) {
      User.remove({}, function(err) {
        done();
      });
    });

    after(function(done) {
      Article.remove({}, function(err) {
        done();
      });
    });

    beforeEach(function(done) {
      dataArticle.datitle = "Article 1";
      dataArticle.content = "Desc Article 1";
      dataArticle.picture = "article1.jpg";
      dataLogin.email = "harles@gmail.com";
      dataLogin.password = "harles";
      done();
    });

    before(function(done) {
      dataUser.save((err, user) => {
        done();
      });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(dataLogin)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    it("it expect create article success", function(done) {
      chai
        .request(app)
        .post("/articles")
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal(`${dataArticle.title} created`);
          expect(res).to.have.status(201)
          done();
        });
    });

    it("it expect if article title is empty ", function(done) {
      dataArticle.title = "";
      chai
        .request(app)
        .post("/articles")
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("err");
          expect(res.body.err).to.haveOwnProperty("errors");
          expect(res.body.err.errors).to.haveOwnProperty("title");
          expect(res.body.err.errors.title).to.haveOwnProperty("message");
          expect(res.body.err.errors.title.message).to.equal(
            "title is required"
          );
          done();
        });
    });

    it("it expect if article content is empty ", function(done) {
      dataArticle.content = "";
      chai
        .request(app)
        .post("/articles")
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("err");
          expect(res.body.err).to.haveOwnProperty("errors");
          expect(res.body.err.errors).to.haveOwnProperty("content");
          expect(res.body.err.errors.content).to.haveOwnProperty("message");
          expect(res.body.err.errors.content.message).to.equal(
            "content is required"
          );
          done();
        });
    });

    it("it expect if article image is empty ", function(done) {
      dataArticle.picture = "";
      chai
        .request(app)
        .post("/articles")
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("err");
          expect(res.body.err).to.haveOwnProperty("errors");
          expect(res.body.err.errors).to.haveOwnProperty("picture");
          expect(res.body.err.errors.picture).to.haveOwnProperty("message");
          expect(res.body.err.errors.picture.message).to.equal(
            "image is required"
          );
          done();
        });
    });
  });
});

describe("ARTICLES PUT", function() {
  describe("artile update", function() {
    let dataUser = new User({
      name: "harles bayu angara",
      picture: "harles.jpg",
      gender: "male",
      email: "harles@gmail.com",
      password: "harles"
    });

    let dataUser2 = new User({
      name: "giri anggara",
      picture: "giri.jpg",
      gender: "female",
      email: "giri@gmail.com",
      password: "giri123"
    });

    let dataLogin = {
      email: "harles@gmail.com",
      password: "harles"
    };

    let dataLogin2 = {
      email: "giri@gmail.com",
      password: "giri123"
    };

    let dataArticle = {
      title: "Article 1",
      content: "Desc Article 1",
      picture: "article1.jpg"
    };

    let dataArticle2 = {
      title: "Article 2",
      content: "Desc Article 2",
      picture: "article2.jpg"
    };

    let token = "";
    let toke2 = "";
    let articleId = "";
    let articleId2 = "";

    before(function(done) {
      dataUser.save((err, user) => {
        done();
      });
    });

    before(function(done) {
      dataUser2.save((err, user) => {
        done();
      });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(dataLogin)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(dataLogin2)
        .end(function(err, res) {
          token2 = res.body.token;
          done();
        });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/articles")
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          articleId = res.body.article._id;
          done();
        });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/articles")
        .set({ token: token2 })
        .send(dataArticle2)
        .end(function(err, res) {
          articleId2 = res.body.article._id;
          done();
        });
    });

    beforeEach(function(done) {
      dataArticle.datatitle = "Article 1";
      dataArticle.content = "Desc Article 1";
      dataArticle.picture = "article1.jpg";
      done();
    });

    after(function(done) {
      User.deleteMany({}, function(err) {
        done();
      });
    });

    after(function(done) {
      Article.deleteMany({}, function(err) {
        done();
      });
    });

    it("it expect if update article success", function(done) {
      chai
        .request(app)
        .put(`/articles/${articleId}`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("article");
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal(
            `update ${dataArticle.title} success`
          );
          expect(res).to.have.status(201);
          done();
        });
    });

    it("it expect if other user update article", function(done) {
      chai
        .request(app)
        .put(`/articles/${articleId2}`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal("access denied");
          done();
        });
    });

    it("it expect if article not found when update article", function(done) {
      chai
        .request(app)
        .put(`/articles/abcdefghijkl`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal("article not found");
          done();
        });
    });

    it("it expect if title is empty", function(done) {
      dataArticle.title = "";

      chai
        .request(app)
        .put(`/articles/${articleId}`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("err");
          expect(res.body.err).to.haveOwnProperty("errors");
          expect(res.body.err.errors).to.haveOwnProperty("title");
          expect(res.body.err.errors.title).to.haveOwnProperty("message");
          expect(res.body.err.errors.title.message).to.equal(
            "title is required"
          );
          done();
        });
    });

    it("it expect if content is empty", function(done) {
      dataArticle.content = "";

      chai
        .request(app)
        .put(`/articles/${articleId}`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("err");
          expect(res.body.err).to.haveOwnProperty("errors");
          expect(res.body.err.errors).to.haveOwnProperty("content");
          expect(res.body.err.errors.content).to.haveOwnProperty("message");
          expect(res.body.err.errors.title.message).to.equal(
            "title is required"
          );
          done();
        });
    });

    it("it expect if image is empty", function(done) {
      dataArticle.picture = "";
      chai
        .request(app)
        .put(`/articles/${articleId}`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("err");
          expect(res.body.err).to.haveOwnProperty("errors");
          expect(res.body.err.errors).to.haveOwnProperty("picture");
          expect(res.body.err.errors.picture).to.haveOwnProperty("message");
          expect(res.body.err.errors.picture.message).to.equal(
            "image is required"
          );
          done();
        });
    });
  });
});

describe("ARTICLES DELETE", function() {
  describe("artile update", function() {
    let dataUser = new User({
      name: "harles bayu angara",
      picture: "harles.jpg",
      gender: "male",
      email: "harles@gmail.com",
      password: "harles"
    });

    let dataUser2 = new User({
      name: "giri anggara",
      picture: "giri.jpg",
      gender: "female",
      email: "giri@gmail.com",
      password: "giri123"
    });

    let dataLogin = {
      email: "harles@gmail.com",
      password: "harles"
    };

    let dataLogin2 = {
      email: "giri@gmail.com",
      password: "giri123"
    };

    let dataArticle = {
      title: "Article 1",
      content: "Desc Article 1",
      picture: "article1.jpg"
    };

    let dataArticle2 = {
      title: "Article 2",
      content: "Desc Article 2",
      picture: "article2.jpg"
    };

    let token = "";
    let toke2 = "";
    let articleId = "";
    let articleId2 = "";

    before(function(done) {
      dataUser.save((err, user) => {
        done();
      });
    });

    before(function(done) {
      dataUser2.save((err, user) => {
        done();
      });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(dataLogin)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(dataLogin2)
        .end(function(err, res) {
          token2 = res.body.token;
          done();
        });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/articles")
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          articleId = res.body.article._id;
          done();
        });
    });

    before(function(done) {
      chai
        .request(app)
        .post("/articles")
        .set({ token: token2 })
        .send(dataArticle2)
        .end(function(err, res) {
          articleId2 = res.body.article._id;
          done();
        });
    });

    beforeEach(function(done) {
      dataArticle.datatitle = "Article 1";
      dataArticle.content = "Desc Article 1";
      dataArticle.picture = "article1.jpg";
      done();
    });

    after(function(done) {
      User.deleteMany({}, function(err) {
        done();
      });
    });

    after(function(done) {
      Article.deleteMany({}, function(err) {
        done();
      });
    });

    it("it expect if delete article success", function(done) {
      chai
        .request(app)
        .delete(`/articles/remove/${articleId}`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("article");
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal(`delete article success`);
          expect(res).to.have.status(201);
          done();
        });
    });

    it("it expect if other user delete article", function(done) {
      chai
        .request(app)
        .delete(`/articles/remove/${articleId2}`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal("access denied");
          expect(res).to.have.status(500);
          done();
        });
    });

    it("it expect if article not found when delete article", function(done) {
      chai
        .request(app)
        .delete(`/articles/remove/abcdefghijkl`)
        .set({ token })
        .send(dataArticle)
        .end(function(err, res) {
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal("article not found");
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

describe("ARTICLE GET", function() {});
