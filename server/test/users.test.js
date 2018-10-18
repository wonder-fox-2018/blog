process.env.NODE_ENV = 'test';
const app = require('../app.js');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const helpers = require('../helpers/helpers.js')
chai.use(chaiHttp);

let UserModel = require('../models/UserModel.js')

describe('Users Detail', () => {
    
    beforeEach((done) => {
        UserModel.deleteMany({}, (err) => {
            done()
        })
    });

    it('should get user by params id', (done) => {
        UserModel.create({
            firstName: 'semmi',
            lastName: 'kosasih',
            email: 'semmi@kosasih.com',
            password: helpers.hash('kosasih'), // hashed
        })
        .then(user=>{

            chai.request(app)
                .get(`/users/${user._id}`)
                .end((err,res)=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a("object");
                    expect(res.body).to.have.property("firstName").eql('semmi')
                    expect(res.body).to.have.property("lastName")
                    expect(res.body).to.have.property("email")
                    done()
                })

        })
    });

});