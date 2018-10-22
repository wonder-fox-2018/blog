const Article = require('../models/article')
const User = require('../models/user')
const jwt =  require('jsonwebtoken')    
const bcrypt = require('bcryptjs')
require('dotenv').config()

//Chai
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
let chaiHttp = require('chai-http');
let app = require('../app.js');
chai.use(chaiHttp);

describe('Articles', () => {
    let id = '';
    let token = '';
    let usertest = {
        name : "usertest",
        email : "usertest@mail.com",
        password : '123456'
      }
    beforeEach((done) => {
      User.create(usertest)
      .then(result=>{
        //   console.log(result);
          id = result._id
        User.findOne({
          _id : result._id
        })
        .then(result2=>{ 
            // console.log(result2);
          const valid = bcrypt.compareSync(usertest.password, result2.password);            
          if(valid){
            jwt.sign({
              email : result2.email,
              name : result2.name,
              id : result2._id
            }, process.env.JWT_SECRET,( err,token )=>{
              if( err ){
                console.log(err);
              } else {
                token = token;
                // console.log(token);
                Article.create({
                  title : "Kopi",
                  text : "lorem ipsum",
                  author : result._id
                })
                .then(result3=>{
                  id = result3._id;
                  done();
                })
                .catch(err=>{
                  console.log(err);
                });
              }
            });
          } else {
            console.log("not valid");
          }
        })
        .catch(err=>{
          console.log(err);
        });
  
      })
      .catch(err=>{
        console.log(err);
      });
    });
  
    describe('/GET Show All articles', () => {
      it('Show all the articles', (done) => {
        chai.request(app)
          .get('/articles')
          .end((err, res) => {
              // console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
      });
    });
  
    afterEach((done) => { 
      Article.remove({}, (err) => {
        User.remove({}, err=>{
          done();
        })
      });
    });
  });