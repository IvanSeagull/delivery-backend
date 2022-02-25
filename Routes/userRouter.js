const { Router } = require('express');
const controller = require('../Controllers/userController.js');
const { check } = require('express-validator');

const userRouter = new Router();

// userRouter.get('/', (req, res) => {
//   res.status(200).json();
// });

userRouter.get('/', controller.getUsers);
userRouter.post(
  '/register',
  [
    check('username', 'Please enter username').notEmpty(),
    check('email', 'Please enter email').isEmail(),
    check('password', 'Password should be between 4 and 10').isLength(4, 10),
  ],
  controller.register,
);
userRouter.post('/login', controller.login);

module.exports = userRouter;
