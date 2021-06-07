const  { Router }  = require('express');
const router = Router();

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

module.exports = router;