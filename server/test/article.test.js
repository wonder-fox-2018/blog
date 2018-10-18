const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../app.js');
const User = require('../models/user.js');
const Article = require('../models/article')

let article = {
    title : 'test',
    article : 'ini adalah content article untuk test'
}

let user = {
    username: 'zura',
    email: 'zura@mail.com',
    password: 'zura'
}

let admin = {
  username : 'kwonyuri',
  email : 'yuri@gmail.com',
  password : 'yuri'
}

let token;

