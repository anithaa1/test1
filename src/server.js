const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Custom Requires
const { sequelize } = require('../model/index');
const config = require('./config/var');
const logger = require('./config/logger'); // Corrected import path


//router path
const router = require("./router/index");
app.use('/api/v1', router);
// Enable Logger & Performance
app.use(logger.httpErrorLogger, logger.httpSuccessLogger, logger.performanceLogger);
// Sync Sequelize Models with the Database
async function syncDatabase() {
    try {
        await sequelize.sync({ alter: false }); // Sync models with database
        logger.info('DB Connection Successful');
        console.log("'DB Connection Successful'");
        startServer();
    } catch (error) {
        logger.error('DB Connection Error:', error);
        console.log('DB Connection Error:', error);
    }
}

// Start Server
function startServer() {
    const server = app.listen(config.app.port, () => {
        logger.info(`Server is running on port ${config.app.port}`);
        console.log(`Server is running on port ${config.app.port}`);
    });
  
}

// Call Function to Sync Database and Start Server
syncDatabase();

module.exports = app;
