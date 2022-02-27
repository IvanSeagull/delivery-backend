const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  discount: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Product;
