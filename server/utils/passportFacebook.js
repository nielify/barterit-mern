const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookUser = require('../models/FacebookUser');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {  
  FacebookUser.findById(id, (err, user) => {
    //console.log('deserializing')
    done(err, user);
  })
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['id', 'last_name', 'first_name', 'middle_name', 'photos']
  },
  (accessToken, refreshToken, profile, cb) => {
    //console.log(profile); 
    //console.log(profile.photos[0].value);
    FacebookUser.findOne({ facebookID: profile.id }, (err, user) => {
      if (user) {
        return cb(err, user); 
      } else { 
        FacebookUser.create({ 
          facebookID: profile.id,
          lastName: profile.name.familyName,
          firstName: profile.name.givenName,
          middleName: profile.name.middleName,
        }, (err, user) => {
          return cb(err, user); 
        });
      }
    });
  }
));