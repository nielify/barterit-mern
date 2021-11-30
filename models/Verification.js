const mongoose = require('mongoose');

const verificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true
  },
  idImage: {
    type: String,
    required: true
  },
  selfieImage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Verification = mongoose.model('verification', verificationSchema);

module.exports = Verification;