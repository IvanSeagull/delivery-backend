const Product = require('../models/Product');

class productController {
  async getProducts(req, res) {
    try {
      let products = await Product.findAll();
      res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new productController();
