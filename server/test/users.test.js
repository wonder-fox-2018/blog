process.env.NODE_ENV = 'test';
const app = require('../app.js');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const helpers = require('../helpers/helpers.js')
chai.use(chaiHttp);

let UserModel = require('../models/UserModel.js')

describe('Users Detail', () => {
    let user = ''

    beforeEach((done) => {
        UserModel.deleteMany({}, (err) => {
            UserModel.create({
                    firstName: 'semmi',
                    lastName: 'kosasih',
                    email: 'semmi@kosasih.com',
                    password: helpers.hash('kosasih'), // hashed
                })
                .then((result) => {
                    user = result
                    done()
                })

        })
    });

    it('should get user by params id', (done) => {

        chai.request(app)
            .get(`/users/${user._id}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("firstName").eql('semmi')
                expect(res.body).to.have.property("lastName")
                expect(res.body).to.have.property("email")
                done()
            })

    });

    it('should update user by params id', (done) => {
        let update = {
            firstName: 'semmiupdate',
            lastName: 'kosasih',
            email: 'semmi@kosasih.com',
            password: helpers.hash('kosasih'),
        }
        chai.request(app)
            .put(`/users/${user._id}`)
            .send(update)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("message").eql('Succes update user')
                done()
            })
    });

});