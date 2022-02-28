const { Router } = require('express');
const controller = require('../Controllers/productController');

const productRouter = new Router();

productRouter.get('/', controller.getProducts);

// productRouter.get('/get-products', (req, res) => {
//   res.status(200).json({ Product: 'Product' });
// });

module.exports = productRouter;
