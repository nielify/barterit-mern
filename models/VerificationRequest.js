const mongoose = require('mongoose');

const verificationRequestSchema = mongoose.Schema({
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

const VerficationRequest = mongoose.model('VerificationRequest', verificationRequestSchema);

module.exports = VerficationRequest;