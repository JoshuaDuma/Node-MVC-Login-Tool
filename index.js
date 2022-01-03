//js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require("dotenv");
app.use(express.urlencoded({extended: false}));
dotenv.config();

const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('e don connect'))
.catch(err => console.log(err));

app.set('view engine', 'ejs');
//Routes
app.use('/', require('./routes/login'));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))