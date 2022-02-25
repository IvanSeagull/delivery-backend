const Sequelize = require('sequelize');
const configData = require('./config');

const db = new Sequelize(configData.DB_NAME, configData.DB_USER, configData.DB_PASSWORD, {
  host: configData.DB_HOST,
  dialect: 'postgres',
  //   operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
