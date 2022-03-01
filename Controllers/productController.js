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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
      let id = req.params.id;
      // console.log(id);
      let { title, description, price, amount, discount, categoryId } = req.body;

      const updatedProduct = await Product.update(
        {
          title,
          description,
          price,
          amount,
          discount,
          categoryId,
        },
        {
          where: {
            id,
          },
        },
      );
      if (updatedProduct.toString() == '1') {
        return res.status(200).json({ msg: 'Updated Product successfully' });
      } else return res.status(404).json({ error: 'Product not found' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async deleteProduct(req, res) {
    try {
      let id = req.params.id;

      const deletedProduct = await Product.destroy({
        where: {
          id,
        },
      });

      if (deletedProduct == '1')
        return res.status(200).json({ msg: 'Deleted product successfully' });
      else return res.status(400).json({ error: 'No such product' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new productController();
