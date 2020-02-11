const express = require('express');
const session = require('express-session');
const cors = require('cors');
const http = require('http');
// const https = require('https');
const socketio = require('socket.io');
// const fs = require('fs');
// const privateKey  = fs.readFileSync('cert/key.pem', 'utf8');
// const certificate = fs.readFileSync('cert/matcha.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};
var createError = require('http-errors');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
/**
 * Start from here
 */
var app = express();

var server = http.createServer(app);

const io = socketio(server);

const { addUser, removeUser, getUser } = require('./container');

/**
 * Requiring routes. 
 */
// var indexRouter = require('./routes/api');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mail = require('./routes/mail');
const appears = require('./routes/appears');
const blocks = require('./routes/blocks');
const likes = require('./routes/likes');
const logs = require('./routes/logs');
const matches = require('./routes/matches');
const messages = require('./routes/messages');
const reports = require('./routes/reports');
const tags = require('./routes/tags');
const unlikes = require('./routes/unlikes');
const verifies = require('./routes/verifies');
const visits = require('./routes/visits');
const notifications = require('./routes/notifications');
const overviews = require('./routes/overviews');



/**
 * Session and basic setup
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //One day
  }
}))

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended : true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: process.env.ORIGIN_URL }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.get('/api/users', users.select);
app.put('/api/users', users.update);
app.put('/api/users/email', users.updateEmail);
app.put('/api/users/password', users.updatePassword);
app.put('/api/users/picture', users.updatePicture);
app.put('/api/users/address', users.updateAddress);
app.put('/api/users/bio', users.updateBio);
app.put('/api/users/notification', users.updateNotification);
app.put('/api/users/filters', users.filters);
app.delete('/api/users', users.delete);

app.get('/api/verifies/up', verifies.up);

app.get('/api/mail/password', mail.forgot);
app.get('/api/mail/reverify', mail.reverify);

app.get('/api/auth/in', auth.in);
app.get('/api/auth/out', auth.out);
app.post('/api/auth/up', auth.up);

app.get('/api/tags', tags.select);
app.post('/api/tags', tags.insert);
app.delete('/api/tags', tags.delete);

app.put('/api/appears', appears.update);
app.post('/api/appears', appears.insert);

app.put('/api/visits', visits.update);
app.post('/api/visits', visits.insert);

app.get('/api/likes', likes.select);
app.put('/api/likes', likes.update);
app.post('/api/likes', likes.insert);
app.delete('/api/likes', likes.delete);

app.put('/api/unlikes', unlikes.update);
app.post('/api/unlikes', unlikes.insert);

app.get('/api/notifications', notifications.select);
app.put('/api/notifications', notifications.update);

app.get('/api/overviews', overviews.select);

app.get('/api/logs', logs.select);

app.get('/api/blocks', blocks.select);
app.post('/api/blocks', blocks.insert);
app.delete('/api/blocks', blocks.delete);

app.post('/api/reports', reports.insert);

app.get('/api/matches', matches.select);

app.get('/api/messages', messages.select);
app.put('/api/messages', messages.update);
app.post('/api/messages', messages.insert);

/**
 * socket io setup
 */
io.on('connection', (socket) => {
  socket.on('join', (id) => {
      // console.log(`connection has created! [ socketId: ${socket.id}, userId: ${id} ]`);
      addUser({ socketId: socket.id, userId: id });
  });

  socket.on('appears', (from, to, callback) => {
      // console.log(`appears is called! [ from: ${from}, to: ${to} ]`);
      if(!getUser(from)) {
          callback(-1);
      } else {
          let promise = appears.insert(from, to, callback);
          const user = getUser(to);
          Promise.all([promise]).then(() => {
              if(user) {
                  io.to(user.socketId).emit('notification', { type: 'appears' });
              }
          });
      }
  });
  
  socket.on('visits', (from, to, callback) => {
      // console.log(`visits is called! [ from: ${from}, to: ${to} ]`);
      if(!getUser(from)) {
          callback(-1);
      } else {
          let promise = visits.insert(from, to, callback);
          const user = getUser(to);
          Promise.all([promise]).then(() => {
              if(user) {
                  io.to(user.socketId).emit('notification', { type: 'visits' });
              }
          });
      }
  });

  socket.on('likes', (from, to, callback) => {
      // console.log(`likes is called! [ from: ${from}, to: ${to} ]`);
      if(!getUser(from)) {
          callback(-1);
      } else {
          let promise = likes.insert(from, to, callback);
          const user = getUser(to);
          Promise.all([promise]).then(() => {
              if(user) {
                  io.to(user.socketId).emit('notification', { type: 'likes' });
              }
          });
      }
  });

  socket.on('unlikes', (from, to, callback) => {
      // console.log(`unlikes is called! [ from: ${from}, to: ${to} ]`);
      if(!getUser(from)) {
          callback(-1);
      } else {
          let promise = unlikes.insert(from, to, callback);
          const user = getUser(to);
          Promise.all([promise]).then(() => {
              if(user) {
                  io.to(user.socketId).emit('notification', { type: 'unlikes' });
              }
          });
      }
  });

  socket.on('message', (from, to, content, callback) => {
      // console.log(`message is called! [ from: ${from}, to: ${to}, content: ${content} ]`);
      if(!getUser(from)) {
          callback(-1);
      } else {
          let promise = messages.insert(from, to, content, callback);
          const user = getUser(to);
          Promise.all([promise]).then(() => {
              if(user) {
                  io.to(user.socketId).emit('message');
              }
          });
      }
  });

  socket.on('disconnect', (id) => {
      // console.log(`disconnect is called! [ id: ${id} ]`);
      removeUser(id);
  });
});


/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || '8000';

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

module.exports = app;
