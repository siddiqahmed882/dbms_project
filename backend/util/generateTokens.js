const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (userEmail, userType) => {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        "userEmail": userEmail,
        "userType": userType
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '900s' } // 15 min
  );
  return accessToken;
};

const generateRefreshToken = (userEmail) => {
  const refreshToken = jwt.sign(
    { "userEmail": userEmail },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
  return refreshToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};