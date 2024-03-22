const jwt = require('jsonwebtoken');
const config = require('../config/var');
function generateAccessToken(user) {
    return jwt.sign(user, config.app.ACCESS_TOKEN, { expiresIn: '60m' });
  }
  
  function verifyAccessToken(token) {
    try {
        if (!token) {
            throw new Error('Token is missing');
        }
        const decoded = jwt.verify(token, config.app.ACCESS_TOKEN);
        console.log("decode",decoded);
        return decoded.email; // Assuming email is stored in the token
    } catch (error) {
        console.error('Error verifying access token:', error);
        throw new Error('Invalid Token. Please login again.');
    }
}

  //refersh token write
  function generateRefreshToken(user) {
    return jwt.sign(user, config.app.REFRESH_TOKEN, { expiresIn: '1d' });
  }
  module.exports = {generateAccessToken, verifyAccessToken,generateRefreshToken}

  





