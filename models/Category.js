const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;
