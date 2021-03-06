const jwt = require('jsonwebtoken');
const { SECRET_JWT } = require('../config');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).json({ msg: 'Unauthorized user' });

    const decodedData = jwt.verify(token, SECRET_JWT);

    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: 'Unauthorized user' });
  }
};
