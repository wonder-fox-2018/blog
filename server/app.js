var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const cors = require('cors')
let config = require('config');
const mongoose = require('mongoose');
require('dotenv').config()
var app = express();


//db options 
mongoose.connect(config.DBHost,{ useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('dev')); //'combined' outputs the Apache style LOGs
}

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({type : 'aplication/json'}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index.js'));

module.exports = app;
