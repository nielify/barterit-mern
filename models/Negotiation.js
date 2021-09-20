const mongoose = require('mongoose');

const negotiationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'post', 
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  notOwner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true
  },
  conversation: [{ 
    sender_id: mongoose.Schema.Types.ObjectId, 
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Negotiation = mongoose.model('negotiation', negotiationSchema);

module.exports = Negotiation;