const express  = require('express')
const routes   = require('./routes')

//ROUTES REQUIRE
const userRoutes = require('./routes/users')
const categoryRoutes = require('./routes/category')
const articleRoutes = require('./routes/article')

const mongoose = require('mongoose')
const cors     = require('cors')
require('dotenv').config()
const app = express()
const port = 3000

mongoose.connect(process.env.MY_LOCAL_MONGODB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo failed to connect:'));
db.once('open', function() {
  console.log('mongo connected')
});

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//ROUTES
app.use('/', routes)
app.use('/users',userRoutes)
app.use('/categories',categoryRoutes)
app.use('/articles',articleRoutes)

app.listen(port, function(){
    console.log('Listening on port', port)
})

module.exports = app;