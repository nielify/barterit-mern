const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  transaction_id: {
    type: String,
    required: true
  },
  sender_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;