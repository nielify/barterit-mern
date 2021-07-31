const { Post } = require('../models/Post');

const jwt = require('jsonwebtoken');

module.exports.post_get = async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      const posts = await Post.find({ userId: verifiedToken.id });
      res.send({posts});
    });
  }
}