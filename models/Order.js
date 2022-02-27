const Sequelize = require('sequelize');
const db = require('../db');
const Item = require('./Item');

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
