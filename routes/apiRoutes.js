const  { Router }  = require('express');
const router = Router();
const cryptoRandomString = require('crypto-random-string');

const sendMail = require('../utils/nodemailer');

router.post('/recaptcha', async (req, res) => {
  const token = req.body.token;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' }
    }
  );
  const data = await response.json();
  res.status(200).send(data.success);
});

router.post('/mail', async (req, res) => { 
  
  try {
    const info = await sendMail(req.body.email);
    console.log(info);
    res.send(info);
  } catch (err) {
    console.log(err);
  }
 
  //console.log(req.body.email);
  //res.send(cryptoRandomString({length: 128}));
});

module.exports = router;