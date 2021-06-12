const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
    gender: '',
    dateOfBirth: '',
    town: '',
    baranggay: '',
    specificAddress: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  console.log(err);

  if (err.message.includes('Last Name is required')) errors.lastName = 'Last Name is required';
  if (err.message.includes('First Name is required')) errors.firstName = 'First Name is required';
  if (err.message.includes('Gender is required')) errors.gender = 'Gender is required';
  if (err.message.includes('Date of Birth is required')) errors.dateOfBirth = 'Date of Birth is required';
  if (err.message.includes('Town is required')) errors.town = 'Town is required';
  if (err.message.includes('Baranggay is required')) errors.baranggay = 'Baranggay is required';
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

  const toSaveData = {
    lastName: req.body.lastName, 
    firstName: req.body.firstName, 
    middleName: req.body.middleName, 
    gender: req.body.gender, 
    dateOfBirth: req.body.dateOfBirth, 
    town: req.body.town, 
    baranggay: req.body.brgy, 
    specificAddress: req.body.specificAddress, 
    email: req.body.email, 
    password: req.body.password
  }

  try {
    validateRegistrationData(req.body);
    const user = await User.create(toSaveData);
    res.status(201).send({ user: user._id, success: true });
  } catch (err) { 
    const errors = handleSignupErrors(err); 
    res.status(400).send({errors}); 
  } 
} 

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { 
      httpOnly: true, 
      maxAge: maxAge * 1000, 
      secure: process.env.ENVIRONMENT === 'dev' ? false : true  
    });
    res.status(200).send({ user: user._id, loginSuccess: true });
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