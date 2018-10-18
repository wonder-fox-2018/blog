var express = require('express');
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.DB);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articles')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);



module.exports = app;
