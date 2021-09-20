const Negotiation = require('../models/Negotiation');

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
