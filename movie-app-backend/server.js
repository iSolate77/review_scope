const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`Listening on ${port}`)
});

const movieRoute = require('./routes/movies');
const reviewRoute = require('./routes/reviews');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

app.use('/', movieRoute);
app.use('/', reviewRoute);
app.use('/', userRoute);
app.use('/', authRoute);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongoDBprod,
  { 
    authSource: 'admin',
    user: process.env.dbUser,
    pass: process.env.dbPass,
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  },
  (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Connected to DB')
    }
  })
