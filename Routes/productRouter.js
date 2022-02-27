const { Router } = require('express');

const productRouter = new Router();

productRouter.get('/', (req, res) => {
  res.status(200).json();
});

productRouter.get('/get-products', (req, res) => {
  res.status(200).json({ Product: 'Product' });
});

module.exports = productRouter;
