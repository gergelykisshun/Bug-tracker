const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
require('./database/index');
const passport = require('passport');
require('./strategies/local');


const app = express();


//MIDDLEWARE
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB
  })
}))
//ENABLE PASSPORT
app.use(passport.initialize());
app.use(passport.session());


// ROUTES
app.use('/api/v1', require('./routes/loginRoute'));
app.use('/api/v1/project', require('./routes/projectRoute'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});





app.listen(process.env.PORT, () => {
  console.log(`running http://127.0.0.1:${process.env.PORT}`)
})