const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../config');

class userController {
  async getUsers(req, res) {
    res.status(200).json({ users: 'users' });
  }
  async register(req, res) {
    try {
      let { username, email, password } = req.body;
      console.log(username, email, password);

      User.findAll({ where: { username: username } })
        .then((users) => {
          if (users.length > 0) {
            return res.status(400).json({ msg: 'User with that username already exists' });
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      password = bcrypt.hashSync(password, 7);

      User.create({
        username,
        email,
        password,
      })
        .then((user) => {
          console.log(user);
          res.redirect('/');
        })
        .catch((err) => console.log(err));
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async login(req, res) {
    res.status(200).json({ msg: 'login' });
  }
}

module.exports = new userController();
