require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const articleRouter = require('./routes/articleRouter.js');
const commentRouter = require('./routes/commentRouter.js');

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// var mongodbUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds137763.mlab.com:37763/blog`;
// mongoose.connect(mongodbUri, {
//     useNewUrlParser: true
// });

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

app.listen(port, function() {
    console.log('Listening on port', port);
});

module.exports = app;