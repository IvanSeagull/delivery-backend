const { Router } = require('express');

const mainRouter = new Router();

const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');

mainRouter.get('/', (req, res) => {
  res.status(200).json({ msg: 'api router' });
});
mainRouter.use('/items', itemRouter);
mainRouter.use('/orders', orderRouter);
mainRouter.use('/users', userRouter);

module.exports = mainRouter;
