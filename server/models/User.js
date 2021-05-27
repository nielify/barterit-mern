const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Password must be atleast 8 characters']
  }
});

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.isValid = async function(email, password) {
  if (email === '' && password === '') throw Error('Email and Password is required');
  if (email === '') throw Error('Email is required');
  if (!isEmail(email)) throw Error('Email is invalid');
  if (password === '') throw Error('Password is required');
  return true;
}

userSchema.statics.login = async function(email, password) {

  const user = await this.findOne({ email });
  const valid = await this.isValid(email, password);

  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      return user;
    } throw Error('Email or password is incorrect');

  } throw Error('Email or password is incorrect');

} 

const User = mongoose.model('user', userSchema);

module.exports = User;