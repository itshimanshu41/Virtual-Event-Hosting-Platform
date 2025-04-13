const jwt = require('jsonwebtoken');
const { cognito } = require('../config/aws-config');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Verify with Cognito
    const params = {
      AccessToken: decoded.accessToken
    };

    await cognito.getUser(params).promise();
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  authenticate
};