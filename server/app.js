const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')
var logger=require('morgan')

require('dotenv').config()

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles')
const commentRouter = require('./routes/comment')
const indexRouter=require('./routes/index')
const app = express();

app.use(logger('dev'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV == 'test') {
  mongoose.connect(process.env.DB_TEST, { useNewUrlParser: true })
} else {
  mongoose.connect(process.env.DB, { useNewUrlParser: true })
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!');
});

app.use('/users', usersRouter);
app.use('/articles', articlesRouter)
app.use('/comment', commentRouter)
app.use('/',indexRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
