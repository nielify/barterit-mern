const Report = require('../models/Report');

module.exports.report_post = async (req, res) => {
  const report = await Report.create(req.body);
  res.send({ message: 'report sent' });
}

module.exports.allReports_get = async (req, res) => {
  const allReports = await Report.find();
  console.log(allReports);
}