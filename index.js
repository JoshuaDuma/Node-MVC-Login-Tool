const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const {
  loginCheck
} = require("./auth/passport");
var MongoDBStore = require('connect-mongodb-session')(session);

loginCheck(passport);

const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('e don connect'))
  .catch(err => console.log(err));

var store = new MongoDBStore({
  uri: database,
  collection: 'sessions'
});

store.on('error', function (error) {
  console.log(error);
});

app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'fadfhdakhf$#!@$wshfaishdf',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use("/", require("./routes/login"));

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server has started at port " + PORT));