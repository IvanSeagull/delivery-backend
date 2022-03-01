const Product = require('../models/Product');
const { validationResult } = require('express-validator');

class productController {
  async getProducts(req, res) {
    try {
      let products = await Product.findAll();
      res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async addProducts(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });

      const { title, description, price, amount, discount, categoryId } = req.body;
      const newProduct = await Product.create({
        title: title.toLowerCase(),
        description,
        price,
        amount,
        discount,
        categoryId,
      });
      return res.status(200).json({ msg: 'Successfully added new product' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async updateProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
    let id = req.params.id;
    console.log(id);
    try {
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async deleteProduct(req, res) {
    console.log(123);
  }
}

module.exports = new productController();
