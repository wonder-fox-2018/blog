const chai = require('chai')
const chaiHttp = require('chai-http')

const User = require('../models/users')
const Category = require('../models/category')
const Article = require('../modles/article')

const app = require('../app')

const should = chai.should();
var assert = require('chai').assert;
var expect = require('chai').expect;

chai.use(chaiHttp)

describe('POST /articles/create', function () {
    let token = '';
    
})

describe('GET /articles/', function () {
    
})


