const mongoose = require('mongoose');

const facebookUserSchema = mongoose.Schema({
  facebookID: {
    type: String,
    unique: true
  },
  lastName: String,
  firstName: String,
  middleName: String,
  profilePicture: String
});

const FacebookUser = mongoose.model('facebookUser', facebookUserSchema);

module.exports = FacebookUser;