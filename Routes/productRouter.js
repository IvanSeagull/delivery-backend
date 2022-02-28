const { Router } = require('express');
const { check } = require('express-validator');

const controller = require('../Controllers/productController');
const productRouter = new Router();

productRouter.get('/', controller.getProducts);

productRouter.get(
  '/add',
  [
    check('title', 'Please enter title').notEmpty(),
    check('description', 'Please enter description').notEmpty(),
    check('price', 'Price should be number').notEmpty().isNumeric(),
    check('amount', 'Amount should be number').notEmpty().isNumeric(),
    check('discount', 'Discount should be number').notEmpty().isNumeric(),
  ],
  controller.addProducts,
);
productRouter.get('/update', controller.updateProduct);
productRouter.get('/delete', controller.deleteProduct);

// productRouter.get('/get-products', (req, res) => {
//   res.status(200).json({ Product: 'Product' });
// });

module.exports = productRouter;
