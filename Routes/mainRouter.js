const { Router } = require('express');

const mainRouter = new Router();

const authMiddleware = require('../middleware/authMiddleware');

const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');

mainRouter.get('/', (req, res) => {
  res.status(200).json({ msg: 'api router' });
});
mainRouter.use('/products', authMiddleware, productRouter);
mainRouter.use('/orders', authMiddleware, orderRouter);
mainRouter.use('/categories', authMiddleware, categoryRouter);

mainRouter.use('/users', userRouter);

module.exports = mainRouter;
