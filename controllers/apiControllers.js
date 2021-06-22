const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');

const crypto = require('crypto');
const bcrypt = require('bcrypt');

const { sendPasswordResetMail } = require('../utils/nodemailer');


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
  // check if email exist, send an error to the client if not

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
  
  /* clicking the link from the email will redirect the user to a client where it accepts 
   a new password that will be verified from the client and the server will receive the new password
   together the token and userid to be continued... tinittittinit tinitnit
  */
}

module.exports.resetPassword_get = async (req, res) => {
  const userId = req.params.userId; 
  const token = req.params.token; 

  const passwordResetToken = await PasswordResetToken.findOne({ userId });  
  if (!passwordResetToken) {
    console.log('Your request has expired');
    return res.send({ error: 'Your request has expired' });
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    console.log('Your request has expired');
    return res.send({ error: 'Your request has expired' });
  }

  res.redirect(`${process.env.DOMAIN1}/user/${userId}/reset-password/${token}`);
}

module.exports.resetPassword_post = async (req, res) => { 
  //actual password reset logic here


  console.log(req.body);
}