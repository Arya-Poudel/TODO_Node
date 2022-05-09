const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config();

const router = require('./routes/task_route');

const app = express();
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use('/', router);

app.use(function(req, res, next) {
    res.render('error', { title: 'Error', error: 'Page not found' });
});

//error handler
app.use(function(err, req, res, next) {
    res.render('error', { title: 'Error', error: err });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App server listening on port ${PORT}`));