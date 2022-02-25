const { Router } = require('express');

const controller = require('../Controllers/userController.js');

const userRouter = new Router();

userRouter.get('/', (req, res) => {
  res.status(200).json();
});

userRouter.get('/get-users', controller.getUsers);

module.exports = userRouter;
