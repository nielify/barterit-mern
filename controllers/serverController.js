//imports
const cloudinary = require('../utils/cloudinary');
const client = require('../utils/twilio');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
=======

const User = require('../models/User');
>>>>>>> 5893ac4152f0f0f9dcd8cb42ceaac17ff47421e3

//controllers
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