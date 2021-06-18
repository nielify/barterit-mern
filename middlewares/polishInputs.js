//removes extra spaces on start and end, 'Capitalize' each word, and
const polish = (input) => {
  return input
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const polishRegInputs = (req, res, next) => {
  req.body.lastName = polish(req.body.lastName);
  req.body.firstName = polish(req.body.firstName);
  req.body.middleName = polish(req.body.middleName);
  req.body.specificAddress = polish(req.body.specificAddress);
  next();
}

module.exports = polishRegInputs;