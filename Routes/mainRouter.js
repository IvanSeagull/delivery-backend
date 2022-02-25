const { Router } = require('express');

const mainRouter = new Router();

const authMiddleware = require('../middleware/authMiddleware');
const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');

mainRouter.get('/', (req, res) => {
  res.status(200).json({ msg: 'api router' });
});
mainRouter.use('/items', authMiddleware, itemRouter);
mainRouter.use('/orders', authMiddleware, orderRouter);
mainRouter.use('/users', userRouter);

module.exports = mainRouter;
