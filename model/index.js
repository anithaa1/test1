'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('../src/config/var');

const basename = path.basename(__filename);
const sequelize = new Sequelize(dbConfig.DB.database, dbConfig.DB.username, dbConfig.DB.password, {
  host: dbConfig.DB.host,
  port: dbConfig.DB.port,
  dialect: dbConfig.DB.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.DB.poolMax,
    min: dbConfig.DB.poolMin,
    acquire: dbConfig.DB.poolAcquire,
    idle: dbConfig.DB.poolIdle
  }
});

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adding the user model
db.user = require('./user')(sequelize, Sequelize.DataTypes);
db.menus=require("./menus")(sequelize, Sequelize.DataTypes)
//db.refreshToken=require("./refreshToken")(sequelize, Sequelize.DataTypes)
//db.changepasswordrequest = require('./passwordChangeRequest')(sequelize, Sequelize.DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
