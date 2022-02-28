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
  async addProducts(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });

      const { title, description, price, amount, discount } = req.body;
      const newProduct = await Product.create({
        title: title.toLowerCase(),
        description,
        price,
        amount,
        discount,
      });
      return res.status(200).json({ msg: 'Successfully added new category' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async updateProduct(req, res) {
    console.log(123);
  }
  async deleteProduct(req, res) {
    console.log(123);
  }
}

module.exports = new productController();
