class userController {
  async getUsers(req, res) {
    res.status(200).json({ users: 'users' });
  }
}

module.exports = new userController();
