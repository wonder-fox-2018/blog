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

describe('Index API', () => {
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
            done()
        })
    });
})