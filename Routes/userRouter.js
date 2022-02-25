const { Router } = require('express');
const controller = require('../Controllers/userController.js');

const userRouter = new Router();

// userRouter.get('/', (req, res) => {
//   res.status(200).json();
// });

userRouter.get('/', controller.getUsers);
userRouter.post('/register', controller.register);
userRouter.post('/login', controller.login);

module.exports = userRouter;
