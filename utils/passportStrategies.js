const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookUser = require('../models/FacebookUser');
const GoogleUser = require('../models/googleUser');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {  
  let user = await GoogleUser.findById(id);
  if (!user) {
    user = await FacebookUser.findById(id);
  }
  done(null, user);
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
          profilePicture: profile.photos[0].value
        }, (err, user) => {
          return cb(err, user); 
        });
      }
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/redirect",
  scope: ['profile']
},
(accessToken, refreshToken, profile, cb) => {
  GoogleUser.findOne({ googleID: profile.id }, (err, user) => {
    if (user) {
      return cb(null, user);
    }
    else {
      GoogleUser.create({ 
        googleID: profile.id,
        lastName: profile.name.familyName,
        firstName: profile.name.givenName,
        middleName: profile.name.middleName,
        profilePicture: profile.photos[0].value
      }, (err, user) => {
        cb(null, user);
      });
    }
  })
}
));