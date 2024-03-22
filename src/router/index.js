const express = require('express');

const routes = express.Router();

const response = require('../utils/response');

routes.use('/user', require('./authRouter'), response.default);
routes.use('/menus', require('./menusRouter'), response.default);
module.exports = routes;