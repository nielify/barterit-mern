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

module.exports.meetingPlace_post = async (req, res) => {
  const negotiation_id = req.body.negotiation_id;
  const from = req.body.from;
  const latlng = req.body.latlng;
  const location = req.body.location;

  const negotiation = await Negotiation.findById(negotiation_id);

  negotiation.meetingPlace = {
    from,
    type: 'suggestion',
    latlng,
    location,
  }
  console.log(negotiation);

  res.send(negotiation);

}