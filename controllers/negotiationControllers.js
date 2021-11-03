const Negotiation = require('../models/Negotiation');
const jwt = require('jsonwebtoken');

module.exports.negotiation_post = async (req, res) => {
  try {
    const isNegotiation = await Negotiation.findOne({notOwner: req.body.notOwner, post: req.body.post });

    if (!isNegotiation) {
      const negotiation = await Negotiation.create(req.body);
      res.send(negotiation);
    } else {
      res.send({ message: 'redirect', negotiation_id: isNegotiation._id });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports.negotiations_get = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      const negotiations = await Negotiation.find({$or:[{owner: verifiedToken.id}, {notOwner: verifiedToken.id}]}).populate('post').populate('owner').populate('notOwner').exec();
      const availableNegotiations = negotiations.filter((negotiation) => negotiation.post.status !== 'bartered' || negotiation.notOwner._id.equals(negotiation.post.barteredTo));
      res.send(availableNegotiations);
    });
  }
}