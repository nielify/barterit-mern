//basic router imports
const  { Router }  = require('express');
const router = Router();

//utils
const cryptoRandomString = require('crypto-random-string');
const sendMail = require('../../utils/nodemailer');

//routes
const userRoutes = require('./user/userRoutes');
const postRoutes = require('./post/postRoutes');
const negotiationRoutes = require('./negotiation/negotiationRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/negotiation', negotiationRoutes);

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