
const path = require('path');

function a() {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  if (process.env.APP_ENV) {
    return process.env.APP_ENV;
  }
  return 'local';
}

require('custom-env').env(a(), './env');


console.log(`process.env.APP_ENV---${process.env.APP_ENV}-----`);

module.exports = {
    app:{
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
        REFRESH_TOKEN: process.env.REFRESH_TOKEN,
        port: process.env.APP_PORT
    },
    DB: {
          dialect: process.env.DB_DIALECT1,
          host: process.env.DB_HOST1 || 'localhost',
          port: parseInt(process.env.DB_PORT1, 10) || 3306,
          username: process.env.DB_USER1,
          password: process.env.DB_PASSWORD1,
          database: process.env.DB_NAME1,
          debug: process.env.DB_DEBUG1,
          //schema: process.env.DB_SCHEMA,
          poolMax: parseInt(process.env.DB_POOL_MAX1, 10) || 5,
          poolMin: parseInt(process.env.DB_POOL_MIN1, 10) || 0,
          poolAcquire: parseInt(process.env.DB_POOL_ACQUIRE1, 10) || 15000,
          pollIdle: parseInt(process.env.DB_POOL_IDLE1, 10) || 10000,
        },
        log: {
            enableLog: parseInt(process.env.ENABLE_LOG, 10) === 1,
            enableConsoleLog: parseInt(process.env.ENABLE_CONSOLE_LOG, 10) === 1,
            maxSize: process.env.MAXSIZE_LOG ? process.env.MAXSIZE_LOG : '128m',
            maxFiles: process.env.MAXFILES_LOG ? process.env.MAXFILES_LOG : '14d',
            debugMode: process.env.DEBUGMODE_LOG ? process.env.DEBUGMODE_LOG : 'info',
          },
    };
