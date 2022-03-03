const { Router } = require('express');
const { check } = require('express-validator');

const controller = require('../Controllers/orderController');

const orderRouter = new Router();

orderRouter.get('/', controller.getOrders);

orderRouter.get('/get-orders', (req, res) => {
  res.status(200).json({ orders: 'orders' });
});

module.exports = orderRouter;
