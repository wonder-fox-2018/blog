const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

// const app = require('../app');
const app = 'localhost:3000';

let user = {
    first_name: 'firstname',
    last_name: 'lastname',
    email: 'email@gmail.com',
    password: '12345'
}

let article = {
    title: 'Test Title',
    description: 'Test Description'
}

let articleUpdate = {
    title: 'Update Title',
    description: 'Update Description'
}

let articleid;
let apptoken;
let userid;

describe('Article API', () => {
    it('POST /users', (done) => {    
        chai.request(app)
        .post('/users')
        .type('form')
        .send(user)
        .end((err, res) => {
            expect(res).to.have.status(201);            
            expect(res.body).to.ownProperty('message')
                .to.be.a('string')
                .eql('User Successfully Created');
            expect(res.body).to.ownProperty('user')
                .to.be.a('object');
            expect(res.body.user).to.ownProperty('first_name')
                .to.be.a('string')
                .eql(user.first_name);
            expect(res.body.user).to.ownProperty('last_name')
                .to.be.a('string')
                .eql(user.last_name);
            expect(res.body.user).to.ownProperty('email')
                .to.be.a('string')
                .eql(user.email);
            expect(res.body.user).to.ownProperty('password')
                .to.be.a('string')
                .to.not.eql(user.password);
            expect(res.body.user).to.ownProperty('_id')
                .to.be.a('string');
            userid=res.body.user._id;
            done();
        })
    });

    it('Login', (done) => {
        chai.request(app)
        .post('/login')
        .send(user)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.ownProperty('apptoken')
                .to.be.a('string');
            apptoken = res.body.apptoken;
            done()
        })
    }),

    it('POST /articles', (done) => {
        chai.request(app)
        .post('/articles')
        .type('form')
        .send(article)
        .set('apptoken', apptoken)        
        .end((err, res) => {
            expect(res).to.have.status(201);            
            expect(res.body).to.ownProperty('message')
                .to.be.a('string')
                .eql('Article Successfully Created');
            expect(res.body).to.ownProperty('articles')
                .to.be.a('object');
            expect(res.body.articles).to.ownProperty('title')
                .to.be.a('string')
                .eql(article.title);
            expect(res.body.articles).to.ownProperty('description')
                .to.be.a('string')
                .eql(article.description);
            expect(res.body.articles).to.ownProperty('author')
                .to.be.a('string')
                .eql(userid);
            expect(res.body.articles).to.ownProperty('_id')
                .to.be.a('string');
            articleid=res.body.articles._id;
            done();
        })
    });
    
    it('Get /articles', (done) => {
        chai.request(app)
        .get('/articles')
        .set('apptoken', apptoken)        
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.ownProperty('articles')
                .to.be.an('array');
            done();
        })
    });

    it('Put /articles', (done) => {
        chai.request(app)
        .put('/articles')
        .set('articleid', articleid)
        .set('apptoken', apptoken)
        .send(articleUpdate)
        .end((err, res) => {
            expect(res).to.have.status(200);            
            expect(res.body).to.ownProperty('message')
                .to.be.a('string')
                .eql('Article Successfully Updated');
            done();
        })
    });

    it('Delete /articles', (done) => {
        chai.request(app)
        .delete('/articles')
        .set('apptoken', apptoken)        
        .set('articleid', articleid)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message)
                .to.be.a('string')
                .eql('Article deleted');
            done();
        })
    });

    it('Delete /users', (done) => {
        chai.request(app)
        .delete('/users')
        .set('apptoken', apptoken)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message)
                .to.be.a('string')
                .eql('User successfully deleted');
            done();
        })
    });
})