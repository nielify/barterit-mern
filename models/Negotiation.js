const mongoose = require('mongoose');

const negotiationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    owner_id: {  
      type: String, 
      required: true
    },
    name: {
      type: String,
      required: true,
    }
  },
  notOwner: {
    owner_id: {  
      type: String, 
      required: true
    },
    name: {
      type: String,
      required: true,
    }
  },
  post: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'post', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Negotiation = mongoose.model('negotiation', negotiationSchema);

module.exports = Negotiation;