const { registerUser, confirmUser, loginUser } = require('../services/cognitoService');
const { generateToken } = require('../utils/authMiddleware');

exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const userAttributes = {
      email,
      name,
      'custom:userId': uuidv4()
    };
    
    await registerUser(email, password, userAttributes);
    res.status(201).json({ message: 'User registered successfully. Please check your email for confirmation.' });
  } catch (error) {
    next(error);
  }
};

exports.confirm = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    await confirmUser(email, code);
    res.json({ message: 'User confirmed successfully' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authResult = await loginUser(email, password);
    
    const token = generateToken({
      email,
      accessToken: authResult.AccessToken,
      idToken: authResult.IdToken,
      refreshToken: authResult.RefreshToken
    });
    
    res.json({ token, expiresIn: authResult.ExpiresIn });
  } catch (error) {
    next(error);
  }
};