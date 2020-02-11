const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
// const https = require('https');
const socketio = require('soket.io');
// const fs = require('fs');
// const privateKey  = fs.readFileSync('cert/key.pem', 'utf8');
// const certificate = fs.readFileSync('cert/matcha.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');

//Start from here
var app = express();

var server = http.createServer(app);

const io = socketio(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});


app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
