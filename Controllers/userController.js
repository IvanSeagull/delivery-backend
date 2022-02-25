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
  async getUsers(req, res) {
    res.status(200).json({ users: 'users' });
  }
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
      user = user[0].dataValues;
      console.log(user);

      // check password
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) return res.status(400).json({ msg: `Wrong password` });

      // create jwt token
      const token = generateAccessToken(user.id, user.username);
      res.status(200).json({ token });
      //
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

module.exports = new userController();
