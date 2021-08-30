//with socketio
const express = require('express');
const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, { cors: { origin: '*' } });

//basic server setups
require('dotenv').config();
require('isomorphic-fetch');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
//const passport = require('passport');
//const session = require('express-session');
const cors = require('cors');
const path = require('path');

//utils
const upload = require('./utils/multer');
//const passportStrategies = require('./utils/passportStrategies');

//controllers
const serverController = require('./controllers/serverController');

//middlewares
app.use(cookieParser());
/*app.use(session({ 
  secret: 'TeamRealme',
  resave: false,
  saveUninitialized: true
}));*/
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
//app.use(passport.initialize());
//app.use(passport.session());

//import routes
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/api/apiRoutes');

//socketio
io.on("connection", socket => {
  //when a user connects
  socket.on('newUser', (user) => {
    socket.broadcast.emit('newUser', { 
      id: user._id,
      name: user.firstName + ' ' + user.lastName,
    });
  });

  socket.on('locationUpdate', (update) => {
    console.log(update)
    socket.broadcast.emit('locationUpdate', update);
  })
});

//database and server connection
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((res) => {
    httpServer.listen(PORT || 3001);
    console.log('SERVER: now listening and connected to db');
  })
  .catch(err => {
    console.log(err);
  });

//backend routes
app.use('/auth', authRoutes);
app.post('/single-upload', upload.single("image"), serverController.singleUpload_post);
app.post('/api/upload', serverController.upload_post);
app.post('/api/sms', serverController.sms_post);
//improved backend routes
app.use('/api', apiRoutes);

//production routes setup
if (process.env.ENVIRONMENT === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}


