

const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
//const { v4: uuidv4 } = require('uuid');
const db = require('../../model/index');

const authService = {};

authService.checkUser = async (email) => {
  try {
    console.log("email",email);
   const existUser = await db.user.findOne({where:{ email:email }});
    console.log("Exist User:", existUser); 
    return existUser;
  } catch (error) {
    console.error('Error occurred during user check:', error);
    throw error; 
  }
};
authService.createUser = async (data) => {
  // Create a new user in the database
  const user = await db.user.create(data);
  console.log("Created User:", user);
  return user;
};


authService.removeAccessToken = async (token) => {
  try {
    const deletedTokenCount = await db.user.destroy({ where: { accesssToken: token } });
    console.log("deleting token:", deletedTokenCount);
    // return deletedTokenCount > 0; // Indicating successful removal if at least one token was deleted
  } catch (error) {
    console.error('Error occurred while removing access token:', error);
    throw new Error('Error occurred while removing access token');
  }
};

authService.saveRefreshToken = async(token) => {
  const refreshToken = await db?.refreshToken?.create(token)
  return  refreshToken
}
authService.findUserByResetToken = async (token) => {
  try {
    const user = await db.user.findOne({where:{ resetToken: token }});
    return user;
  } catch (error) {
    throw new Error('Error finding user by reset token: ' + error.message);
  }
};





module.exports = authService;

  

