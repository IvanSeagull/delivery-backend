const { Router } = require('express');
const controller = require('../Controllers/userController.js');
const { check } = require('express-validator');

const userRouter = new Router();

// userRouter.get('/', (req, res) => {
//   res.status(200).json();
// });

// userRouter.get('/', controller.getUsers);
userRouter.post(
  '/register',
  [
    check('username', 'Please enter username').notEmpty(),
    check('email', 'Please enter email').isEmail(),
    check('password', 'Password should be between 4 and 10').isLength(4, 10),
  ],
  controller.register,
);
userRouter.post(
  '/login',
  [
    check('username', 'Please enter username').notEmpty(),
    // check('email', 'Please enter email').isEmail(),
    check('password', 'Please enter password').notEmpty(),
  ],
  controller.login,
);
userRouter.get('/user_data', controller.getUserData);

userRouter.post(
  '/update_password',
  [
    check('oldPassword', 'Please enter old password').notEmpty(),
    check('newPassword', 'New password should be between 4 and 10').isLength(4, 10),
    check('newPassword2', 'Please repeat new password').isLength(4, 10),
  ],
  controller.updatePassword,
);

module.exports = userRouter;
