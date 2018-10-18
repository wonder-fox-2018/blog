const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../app.js');
const Article = require('../models/articleModel.js');
const User = require('../models/userModel.js');

let token;
let testArticleId;

// CREATE ARTICLE
describe('Article Create API Test', function() {
    before(function(done) {
        User.create({
            name: 'sugita',
            email: 'sugita@mail.com',
            password: 'sugita'
        })
            .then(function(user) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        User.deleteOne({email: 'sugita@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    before(function(done) {
        Article.deleteOne({title: 'hehe'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        Article.deleteOne({title: 'hehe'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    // only to get token to be used in the next it
    it('should return status 201 and a token', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                email: 'sugita@mail.com',
                password: 'sugita'
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should return status 201, success message, and the article data', function(done) {
        chai.request(app)
            .post('/articles/create')
            .set('access-token', token)
            .send({
                title: 'hehe',
                description: 'hehe hehe hehe'
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('article');
                expect(res.body.article).to.have.property('_id');
                expect(res.body.article).to.have.property('title');
                expect(res.body.article).to.have.property('description');
                expect(res.body.article).to.have.property('author');
                expect(res.body.article).to.have.property('createdAt');
                expect(res.body.article).to.have.property('updatedAt');
                done();
            });
    });

    it('should return status 500 and an error message if title is an empty string', function(done) {
        chai.request(app)
            .post('/articles/create')
            .set('access-token', token)
            .send({
                title: '',
                description: 'hehe hehe hehe'
            })
            .end(function(err, res) {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done();
            });
    });

    it('should return status 500 and an error message if description is an empty string', function(done) {
        chai.request(app)
            .post('/articles/create')
            .set('access-token', token)
            .send({
                title: 'hehe',
                description: ''
            })
            .end(function(err, res) {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});

// SHOW ALL
describe('Article Show All Data API Test', function() {
    it('should return status 200 and all articles data', function(done) {
        chai.request(app)
            .get('/articles')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('description');
                expect(res.body[0]).to.have.property('author');
                expect(res.body[0]).to.have.property('createdAt');
                expect(res.body[0]).to.have.property('updatedAt');
                done();
            });
    });
});

// GET BY ID
describe('Article Find By Id Data API Test', function() {
    it('should return status 200 and the article data (if id is valid)', function(done) {
        chai.request(app)
            .get('/articles/5bc802234f0b188630ab5ec4')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('author');
                expect(res.body).to.have.property('createdAt');
                expect(res.body).to.have.property('updatedAt');
                done();
            });
    });

    it('should return status 500 and an error message (if id is invalid)', function(done) {
        chai.request(app)
            .get('/articles/5b')
            .end(function(err, res) {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});

// UPDATE ARTICLE
describe('Article Update API Test', function() {
    before(function(done) {
        User.create({
            name: 'sugita',
            email: 'sugita@mail.com',
            password: 'sugita'
        })
            .then(function(user) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        User.deleteOne({email: 'sugita@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    before(function(done) {
        Article.create({
            title: 'hxhx',
            description: 'hxhx hxhx hxhx'
        })
            .then(function(article) {
                testArticleId = article._id;
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        Article.deleteOne({title: 'hehe'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    // only to get token to be used in the next it
    it('should return status 201 and a token', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                email: 'sugita@mail.com',
                password: 'sugita'
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should return status 200 and a success message', function(done) {
        chai.request(app)
            .put(`/articles/${testArticleId}`)
            .set('access-token', token)
            .send({
                title: 'hihi',
                description: 'hihi hihi hihi'
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('message');
                done();
            });
    });
});

// DELETE ARTICLE
describe('Article Delete API Test', function() {
    before(function(done) {
        User.create({
            name: 'sugita',
            email: 'sugita@mail.com',
            password: 'sugita'
        })
            .then(function(user) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        User.deleteOne({email: 'sugita@mail.com'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    before(function(done) {
        Article.create({
            title: 'huhu',
            description: 'huhu huhu huhu'
        })
            .then(function(article) {
                testArticleId = article._id;
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        Article.deleteOne({title: 'huhu'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    // only to get token to be used in the next it
    it('should return status 201 and a token', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                email: 'sugita@mail.com',
                password: 'sugita'
            })
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should return status 200 and a success message', function(done) {
        console.log(testArticleId)
        chai.request(app)
            .delete(`/articles/${testArticleId}`)
            .set('access-token', token)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('message');
                done();
            });
    });
});

