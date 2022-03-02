const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { SECRET_JWT } = require('../config');

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username,
  };

  return jwt.sign(payload, SECRET_JWT, { expiresIn: '24h' });
};

class userController {
  async register(req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });

      // get params from request
      let { username, email, password } = req.body;

      // check if user with that username exists
      let user = await User.findAll({ where: { username: username } });
      // console.log(user);
      user = user[0] && user[0].dataValues;
      if (user) return res.status(400).json({ msg: 'User with that username already exists' });

      // check if user with that email exists
      user = await User.findAll({ where: { email: email } });
      // console.log(user);
      user = user[0] && user[0].dataValues;
      if (user) return res.status(400).json({ msg: 'User with that email already exists' });

      // return res.status(400).json({ msg: 'User with that username already exists' });
      password = bcrypt.hashSync(password, 7);

      // create new User
      const newUser = await User.create({
        username,
        email,
        password,
      });

      console.log(newUser);

      return res.status(200).redirect('/');
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
  async login(req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });

      // get params from request
      let { username, password } = req.body;

      // find user with that username
      let user = await User.findAll({ where: { username: username } });
      console.log(user);

      // if user is found => user : null
      user = user[0] ? user[0].dataValues : null;
      if (!user) return res.status(400).json({ errors: 'No such user' });

      // check password
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) return res.status(400).json({ msg: `Wrong password` });

      // create jwt token
      const token = generateAccessToken(user.id, user.username);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async getUserData(req, res) {
    try {
      // get token
      let token = req.headers.authorization;
      // check if token exists
      if (!token) return res.status(403).json({ msg: 'Unauthorized user' });
      // splitting token
      token = token.split(' ')[1];

      // getting username from token
      const { username } = jwt.verify(token, SECRET_JWT);

      // finding user with username
      let user = await User.findAll({ where: { username: username } });
      user = user[0] && user[0].dataValues;

      return res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async updatePassword(req, res) {
    try {
      // get token
      let token = req.headers.authorization;
      // check if token exists
      if (!token) return res.status(403).json({ msg: 'Unauthorized user' });
      // splitting token
      token = token.split(' ')[1];

      // getting username from token
      const { username } = jwt.verify(token, SECRET_JWT);

      // validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });

      // getting params from body
      let { oldPassword, newPassword, newPassword2 } = req.body;

      //check if new passwords same
      if (newPassword !== newPassword2)
        return res.status(500).json({ msg: 'Passwords should be same' });

      // find user by username
      let user = await User.findAll({ where: { username: username } });
      user = user[0] ? user[0].dataValues : false;
      if (!user) return res.status(404).json({ msg: 'User not found' });

      // compare oldPassword with user.password
      const validPassword = bcrypt.compareSync(oldPassword, user.password);
      if (!validPassword) return res.status(400).json({ msg: `Wrong password` });

      // hash Password
      const hashedPassword = bcrypt.hashSync(newPassword, 7);

      // update user.password
      const newUser = await User.update(
        { password: hashedPassword },
        {
          where: {
            username: username,
          },
        },
      );
      return res.status(200).json({ msg: 'Successfully updated password ' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}

module.exports = new userController();
