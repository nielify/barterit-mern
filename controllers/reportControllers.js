const Report = require('../models/Report');

module.exports.report_post = async (req, res) => {
  const report = await Report.create(req.body);
  res.send({ message: 'report sent' });
}