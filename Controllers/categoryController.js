const Category = require('../models/Category');
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

      const { oldTitle, newTitle } = req.body;

      const updatedCategory = await Category.update(
        { title: newTitle.toLowerCase() },
        {
          where: {
            title: oldTitle.toLowerCase(),
          },
        },
      );
      console.log(updatedCategory.toString());
      if (updatedCategory.toString() == '1') {
        return res.status(200).json({ msg: 'Updated category successfully' });
      } else return res.status(404).json({ error: 'Category with that title not found' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteCategory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
      const { title } = req.body;

      const deletedCategory = await Category.destroy({
        where: {
          title: title.toLowerCase(),
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
}

module.exports = new categoryController();
