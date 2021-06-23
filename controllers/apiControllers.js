const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sendPasswordResetMail } = require('../utils/nodemailer');

module.exports.marketplace_get = (req, res) => { 
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      const userId = decodedToken.id;
      try {
        const user = await User.findById(userId);
        res.status(200).send(user);
      } catch (err) {
        console.log(err);
      }
    });
  } 
  else if (req.user) {
    res.status(200).send(req.user)
  }
}

module.exports.user_get = async (req, res) => {
  const userId = req.params.userId
  
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch(err) {
    console.log(err);
  }

}

module.exports.forgotPassword_post = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.send({ error: 'User does not exist' });
    }

    const passwordResetToken = await PasswordResetToken.findOne({ userId: user._id });
    if (passwordResetToken) passwordResetToken.deleteOne();

    const newPasswordResetToken = crypto.randomBytes(32).toString("hex");
    const salt = await bcrypt.genSalt();
    const hashedNewPasswordResetToken = await bcrypt.hash(newPasswordResetToken, salt);
    
    const token = await new PasswordResetToken({
      userId: user._id,
      token: hashedNewPasswordResetToken,
      createdAt: Date.now(),
    }).save();
  
    const link = `${process.env.DOMAIN2}/api/user/${user._id}/reset-password/${newPasswordResetToken}`;

    const info = await sendPasswordResetMail(user.email, link, user.firstName);

    res.send({ success: true });
  } catch (err) {
    console.log(err);
  }
}

module.exports.resetPassword_get = async (req, res) => {
  const userId = req.params.userId; 
  const token = req.params.token; 

  const passwordResetToken = await PasswordResetToken.findOne({ userId });  
  
  if (!passwordResetToken) {
    console.log('Your request has expired');
    return res.redirect(`${process.env.DOMAIN1}/forgot-password/expired`);
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  
  if (!isValid) {
    console.log('Your request has expired');
    return res.redirect(`${process.env.DOMAIN1}/forgot-password/expired`);
  }

  res.redirect(`${process.env.DOMAIN1}/user/${userId}/reset-password/${token}`);
}

module.exports.resetPassword_post = async (req, res) => { 

  const userId = req.params.userId;
  const token = req.params.token;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  //find token and check if expired, send an error if expired
  const resetToken = await PasswordResetToken.findOne({ userId });
  if (!resetToken) {
    return res.send({ error: 'token has expired' });
  }

  //compare token from client and token from database, send error if different
  const isValid = await bcrypt.compare(token, resetToken.token);
  if (!isValid) {
    return res.send({ error: 'invalid token' });
  }

  //check if password is the same from previous one, send an error if it is
  const user = await User.findOne({ _id: userId });
  const isPasswordMatch = await bcrypt.compare(newPassword, user.password);
  if (isPasswordMatch) {
    return res.send({ success: false, message: 'Password is the same as previous one, use a different password' });
  }

  //hash the newPassword and make it the new password
  const salt = await bcrypt.genSalt();
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  await User.updateOne(
    { _id: userId },
    { $set: { password: hashedNewPassword } },
    { new: true }
  );

  //delete the token used
  await resetToken.deleteOne();

  res.send({ success: 'true', message: 'password changed'});
}