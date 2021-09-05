const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  //check token if exists and verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
      if (err) {
        console.log(err);
        res.status(401).send({ redirect: true, url: '/signin' });
      }
      else {
        next();
      }
    });
  }
  //facebook user is logged in
  else if (req.user) { 
    next();
  }
  else {
<<<<<<< HEAD
    //res.redirect(`${DOMAIN1}/signin`); //for production
    res.status(401).send({ redirect: true, url: '/signin' }); //working
=======
    //return res.redirect('/signin');
    res.status(401).send({ redirect: true, url: '/signin' });
>>>>>>> 5893ac4152f0f0f9dcd8cb42ceaac17ff47421e3
  }
}

module.exports = requireAuth;