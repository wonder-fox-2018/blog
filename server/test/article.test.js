const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../app.js');
const User = require('../models/user.js');
const Article = require('../models/article')

let article = {
    title : 'test',
    article : 'ini adalah content article untuk test',
}
let edit = {
    title : 'test',
    article : 'update content article untuk test'
}
let user = {
    email: 'zie@gmail.com',
    password: 'zie'
}

let token;
let id;

// create article
describe('User Get Profile Data API Test', function() {
    before(function(done) {
        Article.deleteOne({title : 'test'})
            .then(function(article) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    after(function(done) {
        Article.deleteOne({title: 'test'})
            .then(function(result) {
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    it('should return status 200 and a token', function(done) {
        chai.request(app)
            .post('/users/login')
            .send(user)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it('should return status 201 and article created data', function(done) {
        chai.request(app)
            .post('/articles/add')
            .send(article)
            .set('token', token)
            .end(function(err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('article');
                expect(res.body.article).to.have.property('title');
                expect(res.body.article).to.have.property('article')
                expect(res.body.article).to.have.property('_id');
                id = res.body.article._id;
                done();
            });
    });
    it('should return status 200 and article updated status', function(done){
        chai.request(app)
            .put(`/articles/update/${id}`)
            .send(edit)
            .set('token', token)
            .end(function(err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message')
                expect(res.body).to.have.property('updated')
                done();
            })
    });
});
