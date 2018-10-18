const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const Article = require('../models/articles')
const User = require('../models/users')
const app = require('../app')

chai.use(chaiHttp);

describe('Article', function () {

    let token = ''
    let id = ''

    this.beforeAll('Add dummy user to database', function (done) {
       
        chai.request(app)
            .post('/users/signup')
            .send({
                name: 'Author',
                email: 'author@mail.com',
                password: 'chameleon'
            })
            .end((err, res) => {
                chai
                .request(app)
                .post('/users/signin')
                .send({
                    email: 'author@mail.com',
                    password: 'chameleon'
                })
                .end((err, res) => {
                    token = res.body.token
                    done()
                })
            })
    })
    
    this.afterAll('Remove dummy article and user from database', function (done) {
        Article.deleteMany({
            title: 'Test'
        })
        .then(() => {
            User.deleteOne({
                email: 'author@mail.com'
            })
            .then(() => {
                done()
            })
        })
    })

    describe('POST /articles/', function () {

        describe('without token / invalid token', function () {
            
            it('no token | should return error 500 & error message', function(done) {
                chai
                .request(app)
                .post('/articles/create')
                .send({
                    title: 'Test',
                    content: 'Lorem ipsum'
                })
                .end((err, res) => {
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Token Not Found')
                    expect(res).to.have.status(500)
                    done()
                })
            })
    
            it('invalid token | should return error 500 & error message', function(done) {
                chai
                .request(app)
                .post('/articles/create')
                .set({
                    token: 'invalid'
                })
                .send({
                    title: 'Test',
                    content: 'Lorem ipsum'
                })
                .end((err, res) => {
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Invalid Token')
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })
        
        describe('valid token', function () {

            it('valid input | should save one new article', function(done) {
                chai
                .request(app)
                .post('/articles/create')
                .set({
                    token: token
                })
                .send({
                    title: 'Test',
                    content: 'Lorem ipsum'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    expect(res.body.created).to.have.property('title')
                    expect(res.body.created).to.have.property('content')
                    expect(res.body.created).to.have.property('author')
                    expect(res.body.created.title).to.equal('Test')
                    expect(res.body.created.content).to.equal('Lorem ipsum')
                    id = res.body.created._id
                    done()
                })
            });
    
            it('no title | should return error 500', function(done) {
                chai
                .request(app)
                .post('/articles/create')
                .set({
                    token: token
                })
                .send({
                    title: '',
                    content: 'Lorem ipsum'
                })
                .end((err, res) => {
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('An article need to be titled')
                    done()
                })
            });
    
            it('no content | should return error 500', function(done) {
                chai
                .request(app)
                .post('/articles/create')
                .set({
                    token: token
                })
                .send({
                    title: 'Test',
                    content: ''
                })
                .end((err, res) => {
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('An article need a content')
                    done()
                })
            });
    
            it('no title & no content | should return error 500', function(done) {
                chai
                .request(app)
                .post('/articles/create')
                .set({
                    token: token
                })
                .send({
                    title: '',
                    content: ''
                })
                .end((err, res) => {
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('An article need a content and title')
                    done()
                })
            });
        })
    })
    
    describe('GET /articles/', function () {

        it('without any params | should return an array', function(done) {
            chai
            .request(app)
            .get('/articles/')
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data[0]).to.have.property('_id')
                expect(res.body.data[0]).to.have.property('title')
                expect(res.body.data[0]).to.have.property('content')
                expect(res.body.data[0]).to.have.property('author')
                expect(res.body.data[0].author).to.have.property('name')
                expect(res.body.data[0]._id).to.equal(id)
                expect(res.body.data[0].title).to.equal('Test')
                expect(res.body.data[0].content).to.equal('Lorem ipsum')
                expect(res.body.data[0].author.name).to.equal('Author')
                done()
            })
        })

        it('with params :id | should return an object of article', function (done) {
            chai
            .request(app)
            .get(`/articles/${id}/`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('object')
                expect(res.body.data).to.have.property('title')
                expect(res.body.data).to.have.property('content')
                expect(res.body.data).to.have.property('author')
                expect(res.body.data.author).to.have.property('name')
                expect(res.body.data._id).to.equal(id)
                expect(res.body.data.title).to.equal('Test')
                expect(res.body.data.content).to.equal('Lorem ipsum')
                expect(res.body.data.author.name).to.equal('Author')
                done()
            })
        })
    })

    describe('GET /articles/search/', function () {

        it('keyword = st | should return an array of matched articles', function(done) {
            chai
            .request(app)
            .get(`/articles/search?keyword=st`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data).to.have.lengthOf(1)
                expect(res.body.data[0]).to.have.property('_id')
                expect(res.body.data[0]).to.have.property('title')
                expect(res.body.data[0]).to.have.property('content')
                expect(res.body.data[0]).to.have.property('author')
                expect(res.body.data[0].author).to.have.property('name')
                expect(res.body.data[0]._id).to.equal(id)
                expect(res.body.data[0].title).to.equal('Test')
                expect(res.body.data[0].content).to.equal('Lorem ipsum')
                expect(res.body.data[0].author.name).to.equal('Author')
                done()
            })
        })

        it('keyword = zzz | should return an empty array', function(done) {
            chai
            .request(app)
            .get(`/articles/search?keyword=zzz`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data).to.have.lengthOf(0)
                done()
            })
        })

        it('keyword = "" | should return an array of articles', function(done) {
            chai
            .request(app)
            .get(`/articles/search?keyword=`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data).to.have.lengthOf(1)
                expect(res.body.data[0]).to.have.property('_id')
                expect(res.body.data[0]).to.have.property('title')
                expect(res.body.data[0]).to.have.property('content')
                expect(res.body.data[0]).to.have.property('author')
                expect(res.body.data[0].author).to.have.property('name')
                expect(res.body.data[0]._id).to.equal(id)
                expect(res.body.data[0].title).to.equal('Test')
                expect(res.body.data[0].content).to.equal('Lorem ipsum')
                expect(res.body.data[0].author.name).to.equal('Author')
                done()
            })
        })

        it('no keyword | should return an array of articles', function(done) {
            chai
            .request(app)
            .get(`/articles/search`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a('array')
                expect(res.body.data).to.have.lengthOf(1)
                expect(res.body.data[0]).to.have.property('_id')
                expect(res.body.data[0]).to.have.property('title')
                expect(res.body.data[0]).to.have.property('content')
                expect(res.body.data[0]).to.have.property('author')
                expect(res.body.data[0].author).to.have.property('name')
                expect(res.body.data[0]._id).to.equal(id)
                expect(res.body.data[0].title).to.equal('Test')
                expect(res.body.data[0].content).to.equal('Lorem ipsum')
                expect(res.body.data[0].author.name).to.equal('Author')
                done()
            })
        })
    })

    describe('DELETE /articles/', function () {

        describe('without token / invalid token', function () {
            
            it('no token | should return error 500', function(done) {
                chai
                .request(app)
                .delete(`/articles/${id}`)
                .end((err, res) => {
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Token Not Found')
                    expect(res).to.have.status(500)
                    done()
                })
            })

            it('invalid token | should return error 500', function(done) {
                chai
                .request(app)
                .delete(`/articles/${id}`)
                .set({
                    token: 'invalid'
                })
                .end((err, res) => {
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Invalid Token')
                    expect(res).to.have.status(500)
                    done()
                })
            })
        })

        describe('valid token', function () {
            
            it('it should delete choosen article', function(done) {
                chai
                .request(app)
                .delete(`/articles/${id}`)
                .set({
                    token: token
                })
                .end((err, res) => {
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Article deleted successfully')
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
    })
});