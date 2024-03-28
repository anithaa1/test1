/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const config = require('../config/var');
const db = require('../../model/index');

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req?.headers?.authorization;
    console.log("auth",authHeader);
    const token = authHeader && authHeader?.split(' ')[1];
    console.log("token",token);
    jwt?.verify(token, config?.app?.REFRESH_TOKEN, async (err, user) => {
      if (err){
      console.log(err);
       return res?.sendStatus(401);
      
      }
      // get user details
      const users = await db?.user?.findOne({
        where: {
          email: user?.email,
          id: user?.id,
          isActive: {
            [Op.ne]: false,
          },
          isTrash: false,
        },
      });
      if (token == null || !users) return res?.sendStatus(401);
      const usersData = { ...users?.dataValues };
      req.user = usersData;
      next();
    });
  } catch (error) {
    return res?.sendStatus(500);
  }
}
const checkRole = (role) => {
  return (req, res, next) => {
    console.log("h",role);
    console.log("req",req.user);;
      // Check if user has the required role
      if (req.user && req.user.role !== role) {
          return res.status(403).send({ status: false, message: 'you are not authorized to access this route' });
      }
      next();
  };
};


module.exports ={authenticateToken,checkRole }
