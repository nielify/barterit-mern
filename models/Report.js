const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'post',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;