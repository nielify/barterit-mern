//imports
const cloudinary = require('../utils/cloudinary');
const client = require('../utils/twilio');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//controllers
module.exports.index_get = (req, res) => { 
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      const userId = decodedToken.id;
      try {
        const user = await User.findById(userId);
        res.status(200).send({ email: user.email });
      } catch (err) {
        console.log(err);
      }
    });
  } 
  else if (req.user) {
    res.status(200).send(req.user)
  }
}

module.exports.singleUpload_post = (req, res) => {
  res.send('single upload successful');
}

module.exports.upload_post = (req, res) => {
  const fileStr = req.body.data;
  
  cloudinary.uploader.upload(fileStr, (error, result) => {
    if (error) {
      console.log('upload error', error);
    }
    else {
      console.log('upload successful' ,result);
      res.status(200).send({ message: 'upload successful', result });
    }
  });
}

module.exports.sms_post = (req, res) => {
  client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(data => {   
      console.log(data);
      res.send({ success: true, data });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, err });
    });
}