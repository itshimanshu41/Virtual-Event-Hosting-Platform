const { cognito } = require('../config/aws-config');
const { v4: uuidv4 } = require('uuid');

const UserPoolId = process.env.COGNITO_USER_POOL_ID;
const ClientId = process.env.COGNITO_CLIENT_ID;

const registerUser = async (email, password, userAttributes) => {
  const params = {
    ClientId,
    Username: email,
    Password: password,
    UserAttributes: Object.entries(userAttributes).map(([Name, Value]) => ({ Name, Value }))
  };

  try {
    const result = await cognito.signUp(params).promise();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmUser = async (email, code) => {
  const params = {
    ClientId,
    Username: email,
    ConfirmationCode: code
  };

  try {
    const result = await cognito.confirmSignUp(params).promise();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  };

  try {
    const result = await cognito.initiateAuth(params).promise();
    return result.AuthenticationResult;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerUser,
  confirmUser,
  loginUser
};