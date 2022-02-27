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
categoryRouter.post(
  '/update',
  check('oldTitle', 'Please enter old title').notEmpty(),
  check('newTitle', 'Please enter new title').notEmpty(),

  controller.updateCategory,
);

module.exports = categoryRouter;
