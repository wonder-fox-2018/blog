process.env.NODE_ENV = 'test';
const app = require('../app.js');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const helpers = require('../helpers/helpers.js')
chai.use(chaiHttp);

let UserModel = require('../models/UserModel.js')
let ArticleModel = require('../models/ArticleModel.js')

describe('Article apis', () => {

    let User = ''

    beforeEach((done) => {
        ArticleModel.deleteMany({}, (err) => {
            UserModel.create({
                    firstName: 'semmi',
                    lastName: 'kosasih',
                    email: 'semmi@kosasih.com',
                    password: helpers.hash('kosasih'),
                })
                .then(user => {
                    User = user
                    done()
                })
        })
    });

    afterEach((done) => {
        UserModel.deleteMany({}, (err) => {
            done()
        })
    });

    it('should get all articles', (done) => {
        chai.request(app)
            .get('/articles')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("array");
                done()
            })
    });

    it('should create new article', (done) => {
        chai.request(app)
            .post('/articles')
            .send({
                title: 'Article Title',
                content: 'Article Contents',
                author: User._id,
                comments: undefined
            })
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.have.property("_id");
                expect(res.body).to.have.property("author").eql(String(User._id));
                done()
            })

    });

});