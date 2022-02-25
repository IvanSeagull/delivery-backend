const User = require('../models/User');

class userController {
  async getUsers(req, res) {
    res.status(200).json({ users: 'users' });
  }
  async register(req, res) {
    let { username, email, password } = req.body;
    console.log(username, email, password);
    // res.status(200).json({ users: 'users' });
  }
  async login(req, res) {
    res.status(200).json({ msg: 'login' });
  }
}

module.exports = new userController();
