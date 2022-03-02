const Category = require('../models/Category');
const Product = require('../models/Product');

const { validationResult } = require('express-validator');

class categoryController {
  async getCategories(req, res) {
    try {
      let categories = await Category.findAll();
      res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async addCategory(req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });

      // TODO:
      // check if role == admin

      // getting title from body
      let { title } = req.body;

      const newCategory = await Category.create({
        title: title.toLowerCase(),
      });
      return res.status(200).json({ msg: 'Successfully added new category' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updateCategory(req, res) {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });

      const { newTitle } = req.body;
      const { id } = req.params;

      const updatedCategory = await Category.update(
        { title: newTitle.toLowerCase() },
        {
          where: {
            id,
          },
        },
      );
      console.log(updatedCategory.toString());
      if (updatedCategory.toString() == '1') {
        return res.status(200).json({ msg: 'Updated category successfully' });
      } else return res.status(404).json({ error: 'Category not found' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteCategory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
      const id = req.params.id;

      const deletedCategory = await Category.destroy({
        where: {
          id,
        },
      });

      console.log(deletedCategory);
      if (deletedCategory == '1')
        return res.status(200).json({ msg: 'Deleted category successfully' });
      else return res.status(400).json({ error: 'No such category' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  async getProducts(req, res) {
    try {
      let id = req.params.id;
      let products = await Product.findAll({
        where: { categoryId: id },
      });
      res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new categoryController();
