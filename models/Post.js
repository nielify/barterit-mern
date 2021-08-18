const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true, 
  },
  title: {
    type: String,
    required: true,
  },
  images: [String],
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  inReturn: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model('post', postSchema);

module.exports = { postSchema, Post };