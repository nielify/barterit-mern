const  { Router } = require('express');
const router = Router();

const passport = require('passport');

const authController = require('../controllers/authControllers');

//normal
router.post('/signup', authController.signup_post);
router.get('/signup/verify/:confirmationCode', authController.signupVerifyId_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

//facebook
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  //console.log(req.user);
  res.redirect('http://localhost:3000/');
});

//google
router.get('/google', passport.authenticate('google'));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/');
});

module.exports = router;