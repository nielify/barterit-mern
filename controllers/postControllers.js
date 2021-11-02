const { Post } = require('../models/Post');
const Negotiation = require('../models/Negotiation');

const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const { async } = require('crypto-random-string');

//all post (marketplace)
module.exports.allPost_get = async (req, res) => {
  const allPosts = await Post.find();
  res.send({ allPosts });
}

//get single post 
module.exports.post_get = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId }).populate('userId').exec();
    if (post) {
      res.send({ post });
    }
    else {
      res.send({ message: 'post does not exist' })
    }
  } catch (err) {
    console.log(err);
    res.send({ message: 'error' });
  }
  
}

//delete single post
module.exports.post_delete = async (req, res) => {
  const postId = req.params.id;

  try { 
    const post = await Post.findByIdAndDelete(postId);
    const negotiations = await Negotiation.deleteMany({post: post._id});
    console.log(negotiations);
    res.send({ message: 'Success' });
  } catch (err) {
    console.log(err);
  }
}

//own posts
module.exports.myPosts_get = (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      const posts = await Post.find({ userId: verifiedToken.id });
      res.send({ posts });
    });
  }
}

//create-post
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

//category
module.exports.category_get = async (req, res) => {
  let category = req.params.category;

  if (category === 'antiques-and-collections') category = 'Antiques & Collections';
  if (category === 'arts-and-crafts') category = 'Arts & Crafts';
  if (category === 'auto-parts-and-accessories') category = 'Auto Parts & Accessories';
  if (category === 'baby-products') category = 'Baby Products';
  if (category === 'bags-and-luggage') category = 'Bags & Luggage';
  if (category === 'phones-and-accessories') category = 'Phones & Accessories';
  if (category === 'clothing-shoes-and-accessories') category = 'Clothing, Shoes, & Accessories';
  if (category === 'electronics') category = 'Electronics';
  if (category === 'furniture') category = 'Furniture';
  if (category === 'health-and-beauty') category = 'Health & Beauty';
  if (category === 'home-and-kitchen') category = 'Home & Kitchen';
  if (category === 'jewelry-and-watches') category = 'Jewelry & Watches';
  if (category === 'miscellaneous') category = 'Miscellaneous';
  if (category === 'office-supplies') category = 'Office Supplies';
  if (category === 'patio-garden') category = 'Patio Garden';
  if (category === 'pet-supplies') category = 'Pet Supplies';
  if (category === 'sporting-goods') category = 'Sporting Goods';
  if (category === 'tools-and-home-improvements') category = 'Tools & Home Improvements';
  if (category === 'toys-and-games') category = 'Toys & Games';
  if (category === 'video-games-and-consoles') category = 'Video Games & Consoles';

  const posts = await Post.find({ category });

  res.send({ posts });
}

//get posts of specific user
module.exports.userPosts_get = async (req, res) => {
  const userId = req.params.userId;
  const posts = await Post.find({ userId });
  res.send({posts});
}

//barter specific item
module.exports.barterPost_get = async (req, res) => {
  const post_id = req.params.post_id;
  const user_id = req.params.user_id;
  
  const post = await Post.findById(post_id);
  post.status = 'bartered';
  post.barteredTo = user_id;
  const newPost = await post.save();
  console.log(newPost);
}