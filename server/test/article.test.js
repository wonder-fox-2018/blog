const chaiHttp = require('chai-http')
const chai = require('chai');
const app = require('../app');
const User = require('../models/user');
const Article = require('../models/article');



chai.use(chaiHttp);

var assert = require('chai').assert;
var expect = require('chai').expect;

describe('/post Article', function () {
    let token = '';

    this.beforeAll(function(done) {


        User.create({
            first_name: 'mr',
            last_name: 'tester',
            email: 'user2@gmail.com',
            password: 'hello29qwfcw8!'
        }).then((result) => {
            chai.request(app)
                .post('/login')
                .type('form')
                .send({
                    email: 'user2@gmail.com',
                    password: 'hello29qwfcw8!'
                }).end((err, res) => {
                    token = res.body.result.token;
                    done();
                })
        }).catch((err) => {

        });


    })

    this.afterAll(function(done) {
        User.deleteOne({email: 'user2@gmail.com'}).then((result) => {
            Article.deleteMany({}).then((result) => {
                done()
            }).catch((err) => {
                
            });
        }).catch((err) => {
            
        });
    })

    it('should return 201 when user is logged in when creating an article', function(done) {
        chai.request(app)
            .post('/article')
            .type('form')
            .set({
                'access-token': token
            })
            .send({
                title: 'test title',
                content: 'content'
            }).end((err,res) => {
                
                expect(res.status).equal(201);
                done();
            })
    });

    it('should return 401 when user is not logged in when creating an article', function(done) {

        chai.request(app)
            .post('/article')
            .type('form')
            .set({
                'access-token': ''
            })
            .send({
                title: 'test title',
                content: 'content'
            }).end((err,res) => {
                
                expect(res.status).equal(401);
                done();
            })
    });

    


    
})
