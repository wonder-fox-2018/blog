process.env.NODE_ENV = 'test';
const app = require('../app.js');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const helpers = require('../helpers/helpers.js')
chai.use(chaiHttp);

let UserModel = require('../models/UserModel.js')

describe('User Registraion && Login', () => {

    describe('POST /register', () => {

        beforeEach((done) => {
            UserModel.deleteMany({}, (err) => {
                done()
            })
        });

        let newUser = {
            firstName: 'semmi',
            lastName: 'kosasih',
            email: 'semmi@kosasih.com',
            password: 'kosasih',
        }

        afterEach((done) => {
            newUser = {
                firstName: 'semmi',
                lastName: 'kosasih',
                email: 'semmi@kosasih.com',
                password: 'kosasih',
            }
            done()
        });

        it('should create new user', (done) => {
            chai.request(app)
                .post('/register')
                .send(newUser)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property("_id");
                    expect(res.body).to.have.property("firstName");
                    expect(res.body).to.have.property("lastName");
                    expect(res.body).to.have.property("email");
                    expect(res.body).to.have.property("password");
                    expect(res.body).to.have.property("createdAt");
                    done()
                })
        });

        it('should not register without fullfill all field', (done) => {
            newUser.firstName = ''
            chai.request(app)
                .post('/register')
                .send(newUser)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a("object");
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.have.property("firstName");
                    expect(res.body.errors.firstName).to.have.property("kind").eql('required');
                    done()
                })

        });

        it('should be reqister with valid email format', (done) => {
            newUser.email = 'kosasih.kosasih'
            chai.request(app)
                .post('/register')
                .send(newUser)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a("object");
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.have.property("email");
                    expect(res.body.errors.email).to.have.property("message").eql('invalid email');
                    done()
                })
        });
    });

    describe('POST /login', () => {

        beforeEach((done) => {
            UserModel.deleteMany({}, (err) => {
                done()
            })
        });

        let newUser = {
            firstName: 'semmi',
            lastName: 'kosasih',
            email: 'semmi@kosasih.com',
            password: helpers.hash('kosasih'),  // hashed
        }

        afterEach((done) => {
            newUser = {
                firstName: 'semmi',
                lastName: 'kosasih',
                email: 'semmi@kosasih.com',
                password: 'kosasih',
            }
            done()
        });

        it('should sign in user', (done) => {
            UserModel.create(newUser)
                .then((result) => {
                    chai.request(app)
                        .post('/login')
                        .send({
                            email: 'semmi@kosasih.com',
                            password: 'kosasih'
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property("message").eql('Login Success')
                            expect(res.body).to.have.property("user")
                            expect(res.body).to.have.property("token")
                            done()
                        })
                })
        });

        it('should sign in with valid registered email', (done) => {
            UserModel.create(newUser)
                .then((result) => {
                    chai.request(app)
                        .post('/login')
                        .send({
                            email: 'unregistered@email.com',
                            password: 'whatever'
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(400);
                            expect(res.body).to.have.deep.property("message").eql('Wrong email & Password')
                            done()
                        })
                })
        });

        it('should sign in with valid correct account password', (done) => {
            UserModel.create(newUser)
                .then((result) => {
                    chai.request(app)
                        .post('/login')
                        .send({
                            email: 'semmi@kosasih.com', //correct
                            password: 'wrongaccountpass' //wrong
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(400);
                            expect(res.body).to.have.deep.property("message").eql('Wrong Password')
                            done()
                        })
                })
        });
    });

});