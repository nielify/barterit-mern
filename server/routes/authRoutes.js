const  { Router }  = require('express');
const router = Router();

const passport = require('passport');

const authController = require('../controllers/authControllers');

//normal
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

//facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile']
}));
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('http://localhost:3000/');
});

module.exports = router;