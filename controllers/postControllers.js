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

module.exports.create_post = async (req, res) => { 
  const token = req.cookies.jwt;
  let userId = null;
  let filteredInReturn = req.body.inReturn.map(item => item.label);

  console.log('received');
  res.send({ message: 'received' });

  /* if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
      userId = verifiedToken.id;
    });
  }

  const post = {
    userId,
    //images: //req.body.imageFiles, //new array image links saved to cloudinary
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    location: req.body.location,
    inReturn: filteredInReturn,
  }

  try {
    const newPost = await Post.create(post);
    console.log('post created');
  } catch(err) {
    console.log(err)
  } */

}