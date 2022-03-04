const { Router } = require('express');
const { check } = require('express-validator');

const controller = require('../Controllers/orderController');

const orderRouter = new Router();

orderRouter.get('/', controller.getAllOrders);

orderRouter.get('/:id', controller.getOrder);

orderRouter.post(
  '/create',
  [
    check('userId', 'Please enter a userId').isNumeric(),
    check('orderProducts', 'Please enter a products').notEmpty(),
  ],
  controller.createOrder,
);

module.exports = orderRouter;
