const Order = require('../models/Order');

class orderController {
  async getOrders(req, res) {
    try {
      let orders = await Order.findAll();
      res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new orderController();
