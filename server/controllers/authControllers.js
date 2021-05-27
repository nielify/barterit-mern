const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handling errors 
const handleErrors = (err) => {
  const errors = { email: '', password: '' };

  console.log(err.message);

  //signup
  if (err._message === 'user validation failed') {
    Object.values(err.errors).forEach(error => {
      errors[error.path] = error.properties.message;
    });
  }
  if (err.code === 11000) {
    errors['email'] = 'Email is already registered';
  }

  //signin
  if (err.message === 'Email and Password is required') {
    errors.email = 'Email is required';
    errors.password = 'Password is required';
  }
  if (err.message === 'Email or password is incorrect') {
    errors.email = err.message; 
    errors.password = err.message;
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

//create jwt token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.create({ email, password });
    res.status(201).send({ user: user._id, success: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send(errors);
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).send({ user: user._id, loginSuccess: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send(errors);
  }
}

module.exports.logout_get = (req, res) => {
  const token = req.cookies.jwt;
  res.cookie('jwt', '', { 
    maxAge: 1, 
    httpOnly: true, 
    secure: process.env.ENVIRONMENT === 'dev' ? false : true 
  });
  res.status(200).send({ logoutSuccess: true });
}

