const { Router } = require('express');
const controller = require('../Controllers/categoryController');
const { check } = require('express-validator');

const categoryRouter = new Router();

// categoryRouter.get('/', (req, res) => {
//   res.status(200).json();
// });

categoryRouter.get('/', controller.getCategories);
categoryRouter.post(
  '/add',
  check('title', 'Please enter title').notEmpty(),
  controller.addCategory,
);
categoryRouter.put(
  '/update/:id',
  check('id', 'Please enter id').notEmpty().isNumeric(),
  check('newTitle', 'Please enter new title').notEmpty(),

  controller.updateCategory,
);

categoryRouter.delete(
  '/delete/:id',
  check('id', 'Please enter id').notEmpty().isNumeric(),
  controller.deleteCategory,
);

// categoryRouter.put(
//   '/update',
//   check('oldTitle', 'Please enter old title').notEmpty(),
//   check('newTitle', 'Please enter new title').notEmpty(),

//   controller.updateCategory,
// );

// categoryRouter.delete(
//   '/delete',
//   check('title', 'Please enter title').notEmpty(),
//   controller.deleteCategory,
// );

module.exports = categoryRouter;
