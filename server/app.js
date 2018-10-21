require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const db = mongoose.connection
const port = process.env.PORT || 3000
const DBName = `blog_${process.env.DB_STAGE || 'dev'}`

const userRoute = require('./routes/userRoute')
const articleRoute = require('./routes/articleRoute')
const categoryRoute = require('./routes/categoryRoute')
const commentRoute = require('./routes/commentRoute')

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECTION + DBName, {
  useNewUrlParser: true
});
app
  .use(cors())
  .use(express.urlencoded({
    extended: false
  }))
  .use(express.json())

  .use('/users', userRoute)
  .use('/article', articleRoute)
  .use('/category', categoryRoute)
  .use('/comment', commentRoute)
  .get('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'server blog is ON'
    })
  })

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`> DB Connected to ${DBName}`)
});

app.listen(port, () => {
  console.log(`\n> Server Listening to port ${port}`)
})

module.exports = app
