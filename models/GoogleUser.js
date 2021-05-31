const mongoose = require('mongoose');

const googleUserSchema = mongoose.Schema({
  googleID: {
    type: String,
    unique: true
  },
  lastName: String,
  firstName: String,
  middleName: String,
  profilePicture: String
});

const googleUser = mongoose.model('googleUser', googleUserSchema);

module.exports = googleUser;