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
const Negotiation = require('./models/Negotiation');

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
  // *** THIS IS FOR MAP *** 

  //socketInstance data
  let socketData = null;

  //when someone join the socket
  //join him/her to a certain room
  //broadcast to other clients in the room with user data
  socket.on('join-room', (user) => {
    socket.join(user.roomId);
    socketData = user;
    socket.broadcast.to(user.roomId).emit('join-room', user);
  });

  //when someone locationUpdates
  //broadcast the update data to other users in the room where the sender belongs
  socket.on('locationUpdate', (update) => {
    socket.broadcast.to(update.roomId).emit('locationUpdate', update);
  });

  socket.on('disconnect', () => {
    if (socketData) socket.broadcast.to(socketData.roomId).emit('userDisconnect', socketData);
  });

  // *** FOR MAP ENDS HERE ***

  // *** THIS IS FOR NEGOTIATIONS ***

  socket.on('join-chat', async (data) => {
    socket.join(data.negotiation_id);
    const negotiation = await Negotiation.findOne({ _id: data.negotiation_id }).populate('post').populate('owner').populate('notOwner').exec();
    io.in(data.negotiation_id).emit('update-chat', negotiation);
  });

  socket.on('chat', async (data) => {
    const negotiation = await Negotiation.findOneAndUpdate({_id: data.negotiation_id}, 
      {
        $push: { 
          conversation: {
            sender_id : data.sender_id,
            message: data.message
          }
        },
        $set: {
          createdAt: Date.now()
        }
    },
      { new: true }
    );
    io.in(data.negotiation_id).emit('chat', negotiation.conversation);

    console.log(negotiation);

    io.in(data.sender_id).emit('notif-message', { negotiation_id: data.negotiation_id });
  });

  // *** FOR NEGOTIATIONS ENDS HERE ***


  // *** THIS IS FOR NOTIFICATIONS ***
  socket.on('join-self-room', (data) => {
    socket.join(data.user_id);
  })

  // *** FOR NOTIFICATIONS ENDS HERE ***
  
});

//database and server connection
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false })
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