const { Post } = require('../models/Post');

const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

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
  const imageFiles = req.body.imageFiles;

  let multiplePicturePromise = imageFiles.map((imageFile) => cloudinary.uploader.upload(imageFile.image));
  let cloudinaryResults =  await Promise.all(multiplePicturePromise);
  let cloudinaryImageFiles = cloudinaryResults.map(result => result.url);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
      userId = verifiedToken.id;
    });
  }

  const post = {
    userId,
    images: cloudinaryImageFiles,
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    location: req.body.location,
    inReturn: filteredInReturn,
  }

  try {
    await Post.create(post);
    res.send({ message: 'post created' });
  } catch(err) {
    console.log(err)
    res.send({ message: 'error occured' });
  }

}