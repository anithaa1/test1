const express = require('express');

const routes = express.Router();

const response = require('../utils/response');

routes.use('/user', require('./authRouter'), response.default);
routes.use('/menus', require('./menusRouter'), response.default);
routes.use('/banner', require('./bannerRouter'), response.default);
routes.use('/apiCall', require('./apiRouter'), response.default);
module.exports = routes;