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
    jwt?.verify(token, config?.app?.ACCESS_TOKEN, async (err, user) => {
      if (err) return res?.sendStatus(401);
      // get user details
      const users = await db?.user?.findOne({
        where: {
          userName: user?.name,
          id: user?.id,
          userStatus: {
            [Op.ne]: 'Inactive',
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

module.exports = authenticateToken;
