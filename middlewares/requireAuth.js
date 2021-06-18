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
    res.redirect(`${process.env.DOMAIN1}/signin`);
  }
}

module.exports = requireAuth;