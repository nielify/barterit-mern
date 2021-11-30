const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/User');
const Negotiation = require('../models/Negotiation');
const PasswordResetToken = require('../models/PasswordResetToken');
const Verification = require('../models/Verification');

const cloudinary = require('../utils/cloudinary');
const { sendPasswordResetMail } = require('../utils/nodemailer');

//const { async } = require('crypto-random-string');

module.exports.user_get = async (req, res) => {   
  const token = req.cookies.jwt;
  
  //check token if exists and verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      if (err) {
        console.log(err);
        res.status(401).send({ redirect: true, url: '/signin' });
      }
      else {
        try {
          const user = await User.findById(verifiedToken.id);
          res.status(200).send({user});
        } catch (err) {
          console.log(err);
        }
      }
    });
  }  
}

module.exports.verifyAccount_post = async (req, res) => {
  const user_id = req.params.id;
  const idImage = req.body.idImage;
  const selfieImage = req.body.faceImage;

  const id_result = await cloudinary.uploader.upload(idImage);
  const selfie_result = await cloudinary.uploader.upload(selfieImage);

  const request = await Verification.create({
    user: user_id,
    idImage: id_result.secure_url,
    selfieImage: selfie_result.secure_url
  });

  //set user verification status to pending
  const user = await User.findById(user_id);
  user.isVerificationPending = true;
  const newUser = await user.save();

  res.send(newUser);
}

module.exports.userSearch_get = async (req, res) => {

  const searchArray = req.params.name.split(' ');
  const searchJoined = searchArray.join('|');

  const results = await User.find({
    $or: [
      {
        firstName: { 
          $regex: searchJoined, 
          $options: "i" 
        },
      },
      {
        lastName: {
          $regex: searchJoined, 
          $options: "i" 
        }
      },
    ]
  })
  
  res.send(results);
}

module.exports.allUsers_get = async (req, res) => {
  const users = await User.find();
  res.send(users);
}

module.exports.viewUser_get = async (req, res) => {
  const userId = req.params.userId
  
  try {
    const user = await User.findById(userId);
    res.send({ user });
  } catch(err) {
    console.log(err);
  }

}

module.exports.savedItems_get = async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      const user = await User.findOne({ _id: verifiedToken.id }).populate('savedPosts').exec();
      res.send({ savedPosts: user.savedPosts });
    });
  }
}

module.exports.saveItems_post = async (req, res) => {
  const postId = req.params.id;
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      const user = await User.findOne({ _id: verifiedToken.id })
      user.savedPosts.push(postId);
      const newUser = await user.save();
      res.send({ savedPosts: newUser.savedPosts });
    });
  }
}

module.exports.savedItems_delete = async (req, res) => {
  const postId = req.params.id;
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      const user = await User.findOne({ _id: verifiedToken.id })
      user.savedPosts.pull(postId);
      const newUser = await user.save();
      res.send({ savedPosts: newUser.savedPosts });
    });
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

module.exports.changePicture_post = async (req, res) => {
  const profilePicture = req.body.pictureHolder;
  const userToken = req.cookies.jwt;

  jwt.verify(userToken, process.env.JWT_SECRET, async (err, decodedToken) => {
    const userId = decodedToken.id;
    try {
      const user = await User.findById(userId);
      if (user) {
        cloudinary.uploader.upload(profilePicture, async (error, result) => {
          if (error) { 
            console.log('upload error', error); 
          } 
          else {
            user.profilePicture = result.url;
            const newUser = await user.save();
            res.status(200).send(newUser);
          }
        });
      } else {
        console.log('no user found');
      }
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports.changeBackground_post = async (req, res) => {
  const backgroundPicture = req.body.backgroundHolder;
  const userToken = req.cookies.jwt;

  jwt.verify(userToken, process.env.JWT_SECRET, async (err, decodedToken) => {
    const userId = decodedToken.id;
    try {
      const user = await User.findById(userId);
      if (user) {
        cloudinary.uploader.upload(backgroundPicture, async (error, result) => {
          if (error) { 
            console.log('upload error', error); 
          } 
          else {
            user.backgroundPicture = result.url;
            const newUser = await user.save();
            res.status(200).send(newUser);
          }
        });
      } else {
        console.log('no user found');
      }
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports.notification_delete = async (req, res) => {
  const user_id = req.params.user_id;
  const negotiation_id = req.params.negotiation_id;

  try {
    const user = await User.findOneAndUpdate({ _id: user_id }, {$pull: { notifications: { negotiation: negotiation_id } }})
    res.send({ message: 'success' });
  } catch (err) {
    res.send({ err });
  }
  
}

module.exports.rateUser_post = async (req, res) => {
  const owner_id = req.params.owner_id; //owner or not owner
  const token = req.cookies.jwt;
  const negotiation_id = req.body.negotiation_id;
  const stars = req.body.stars;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      //add rating to owner
      const user = await User.findOne({ _id: owner_id });
      user.ratings.push({ from: owner_id, stars });
      await user.save();

      //change negotiation field ratedByUser/ratedByOwner to true
      const negotiation = await Negotiation.findOne({ _id: negotiation_id }).populate('post').populate('owner').populate('notOwner').exec();;
      if (verifiedToken.id == negotiation.owner._id) {
        negotiation.isRatedBySeller = true;
      }
      else if (verifiedToken.id == negotiation.notOwner._id) {
        negotiation.isRatedByBuyer = true;
      }
      await negotiation.save();
      res.send(negotiation);
    });
  }
}

module.exports.banUser_post = async (req, res) => {
  const user_id = req.params.user_id;

  const user = await User.findById(user_id);
  user.isBanned = true;
  const newUser = await user.save();
  res.send(newUser);
}

module.exports.verifyUser_post = async (req, res) => {
  const user_id = req.params.user_id;

  const user = await User.findById(user_id);
  user.isVerified = true;
  const newUser = await user.save();
  res.send(newUser);
}