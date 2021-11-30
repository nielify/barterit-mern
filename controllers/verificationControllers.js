const Verification = require('../models/Verification');

module.exports.allVerifications_get = async (req, res) => {
  const allVerifications = await Verification.find().populate('user').exec();
  res.send(allVerifications);
}