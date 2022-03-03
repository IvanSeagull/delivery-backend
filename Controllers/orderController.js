const Order = require('../models/Order');

class orderController {
  async getAllOrders(req, res) {
    try {
      let orders = await Order.findAll();
      res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async getOrder(req, res) {
    try {
      let id = req.params.id;
      let order = await Order.findAll({ where: { id } });
      res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new orderController();
