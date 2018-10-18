require('dotenv').config();

const express = require('express'),
      app = express(),
      cors = require('cors'),
      jwt = require('jsonwebtoken'),
      bodyParser= require('body-parser');

const indexRouter = require('./routes/index'),
      usersRouter = require('./routes/users'),
      articlesRouter = require('./routes/articles'),
      commentsRouter = require('./routes/comments');

let PORT = 3000 || PORT;


//Connecting to Mongoose
const mongoose   = require('mongoose'),
      urltest = `mongodb://localhost:27017/blog-test`,
      url = `mongodb://illion01:illion01@ds125021.mlab.com:25021/blog`;

if (process.env.NODE_ENV === 'test') {
  console.log('ready to test our server')
    mongoose.connect(urltest,{ useNewUrlParser: true });
} else {
    mongoose.connect(url,{ useNewUrlParser: true });
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});


app.listen (PORT, () => {
  console.log(`Application listening on port: ${PORT}`);
});


app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors());


app
  .use('/', indexRouter)
  .use('/users', usersRouter)
  .use('/articles', articlesRouter)
  .use('/comments', commentsRouter);

module.exports = app