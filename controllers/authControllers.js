const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const { sendVerificationMail } = require('../utils/nodemailer');

//handling Login errors 
const handleLoginErrors = (err) => {
  const errors = { email: '', password: '' };
  
  //signup
  if (err._message === 'user validation failed') {
    Object.values(err.errors).forEach(error => {
      errors[error.path] = error.properties.message;
    });
  }
  /*if (err.code === 11000) {
    errors['email'] = 'Email is already registered';
  }*/

  //signin
  if (err.message === 'Email and Password is required') {
    errors.email = 'Email is required';
    errors.password = 'Password is required';
  }
  if (err.message === 'Email or password is incorrect') {
    errors.email = 'Email might be incorrect'; 
    errors.password = 'Password might be incorrect';
  }
  if (err.message === 'Email is required') {
    errors.email = err.message;
  }
  if (err.message === 'Password is required') {
    errors.password = err.message;
  }
  if (err.message === 'Email is invalid') {
    errors.email = err.message;
  }

  return errors;
}

//handling Login errors 
const handleSignupErrors = (err) => {
  const errors = {
    lastName: '',
    firstName: '',
    middleName: '',
    sex: '',
    dateOfBirth: '',
    town: '',
    barangay: '',
    specificAddress: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  console.log(err);

  if (err.message.includes('Last Name is required')) errors.lastName = 'Last Name is required';
  if (err.message.includes('First Name is required')) errors.firstName = 'First Name is required';
  if (err.message.includes('Sex is required')) errors.sex = 'Sex is required';
  if (err.message.includes('Date of Birth is required')) errors.dateOfBirth = 'Date of Birth is required';
  if (err.message.includes('Town is required')) errors.town = 'Town is required';
  if (err.message.includes('Barangay is required')) errors.barangay = 'Barangay is required';
  if (err.message.includes('Specific Address is required')) errors.specificAddress = 'Specific Address is required';
  if (err.message.includes('Email is required')) errors.email = 'Email is required';
  if (err.message.includes('Email is invalid')) errors.email = 'Email is invalid';
  if (err.code === 11000) errors.email = 'Email is already registered';
  if (err.message.includes('Password is required')) errors.password = 'Password is required';
  if (err.message.includes('Invalid password format')) errors.password = 'Invalid password format';
  if (err.message.includes('Password does not match')) errors.password = 'Password does not match';

  return errors;
}

//create jwt token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}

//validate registrationData (backend)
const validateRegistrationData = (regData) => {
  if (!passwordIsValid(regData.password)) throw Error('Invalid password format');
  if (regData.password !== regData.confirmPassword) throw Error('Password does not match'); 
}

//check if email is valid
/*const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}*/

//check if password is valid
const passwordIsValid = (password) => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}

module.exports.signup_post = async (req, res) => {
  const confirmationCode = cryptoRandomString({length: 128});

  const toSaveData = {
    lastName: req.body.lastName, 
    firstName: req.body.firstName, 
    middleName: req.body.middleName, 
    sex: req.body.sex, 
    dateOfBirth: req.body.dateOfBirth, 
    town: req.body.town, 
    barangay: req.body.brgy, 
    specificAddress: req.body.specificAddress, 
    email: req.body.email, 
    password: req.body.password,
    confirmationCode
  }

  try {
    validateRegistrationData(req.body);
    const user = await User.create(toSaveData);
    const info = await sendVerificationMail(user.email, confirmationCode);
    
    //tentative delete on email not sent because of captcha shits
    if (info.rejected[0]) {
      user.deleteOne();
    }

    res.status(201).send({ email: user.email, success: true });
  } catch (err) { 
    const errors = handleSignupErrors(err); 
    res.status(400).send(errors); 
  } 
}   

module.exports.signupVerifyId_get = async (req, res) => {
  const confirmationCode = req.params.confirmationCode;
  try { 
    const user = await User.findOne({ confirmationCode });  
    if (user) {
      user.confirmationCode = undefined;
      user.isActive = true;
      const newUser = await user.save();
      return res.redirect(`${process.env.DOMAIN1}/signup/success`);
    } {
      return res.redirect(`${process.env.DOMAIN1}/signin`);
    }
  } catch(err) {
    console.log(err);
    res.send({err});
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    if (user.isActive) {
      const token = createToken(user._id);
      res.cookie('jwt', token, { 
        httpOnly: true, 
        maxAge: maxAge * 1000, 
        secure: process.env.ENVIRONMENT === 'dev' ? false : true  
      });
      return res.status(200).send({ user: user._id, loginSuccess: true });
    }
    else {
      return res.status(200).send({ loginSuccess: false, reason: 'Account is not active yet' });
    }
    
  } catch (err) {
    const errors = handleLoginErrors(err);
    res.status(400).send(errors);
  }
} 

module.exports.logout_get = (req, res) => { 
  const token = req.cookies.jwt; 
  
  if (token) { 
    res.cookie('jwt', '', { 
      maxAge: 1, 
      httpOnly: true, 
      secure: process.env.ENVIRONMENT === 'dev' ? false : true 
    }); 
  } 
  
  if (req.user) { 
    req.logout(); 
  } 

  res.status(200).send({ logoutSuccess: true }); 
}