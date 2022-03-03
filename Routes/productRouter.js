const { Router } = require('express');
const { check } = require('express-validator');

const controller = require('../Controllers/productController');
const productRouter = new Router();

productRouter.get('/', controller.getAllProducts);

productRouter.get('/:id', controller.getProduct);

productRouter.post(
  '/add',
  [
    check('title', 'Please enter title').notEmpty(),
    check('description', 'Please enter description').notEmpty(),
    check('price', 'Price should be number').notEmpty().isNumeric(),
    check('amount', 'Amount should be number').notEmpty().isNumeric(),
    check('discount', 'Discount should be number').notEmpty().isNumeric(),
    check('categoryId', 'Please enter').notEmpty().isNumeric(),
  ],
  controller.addProducts,
);
productRouter.put('/update/:id', check('id', 'Enter id').isNumeric(), controller.updateProduct);
productRouter.delete('/delete/:id', controller.deleteProduct);

module.exports = productRouter;
