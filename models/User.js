const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  lastName: {
    type: String,
    required: [true, "Last Name is required"]
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"]
  },
  middleName: String,
  gender: {
    type: String,
    required: [true, "Gender is required"]
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of Birth is required"]    
  },
  town: {
    type: String,
    required: [true, "Town is required"]
  },
  baranggay: {
    type: String,
    required: [true, "Baranggay is required"]
  },
  specificAddress: {
    type: String,
    required: [true, "Specific Address is required"]
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Email is invalid']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    //minlength: [8, 'Password must be atleast 8 characters']
  },
  isActive: {
    type: Boolean,
    default: false
  },
  confirmationCode: {
    type: String,
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isActive) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.isAccountValid = async function(email, password) {
  if (email === '' && password === '') throw Error('Email and Password is required');
  if (email === '') throw Error('Email is required');
  if (!isEmail(email)) throw Error('Email is invalid');
  if (password === '') throw Error('Password is required');
  return true;
}

userSchema.statics.login = async function(email, password) {
  const valid = await this.isAccountValid(email, password);
  const user = await this.findOne({ email });
  
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      return user;
    } throw Error('Email or password is incorrect');

  } throw Error('Email or password is incorrect');

} 

const User = mongoose.model('user', userSchema);

module.exports = User;