'use strict'

require('dotenv').config();
const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const index = require('./routes');
const users = require('./routes/users');
const articles = require('./routes/articles');

const app = express();

const dbUrl = process.env.DB_URL;
//const dbUrl = 'mongodb://localhost:27017/blog';
mongoose.connect(dbUrl, (err) => {
    if(!err) {console.log('Connected to Database');}
    else {throw new Error(err);}
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Server is On'
    })
})


app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);



app.listen(3000, () => {
    console.log(`Listening to port 3000`)
})

module.exports = app;