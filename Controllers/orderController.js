const Order = require('../models/Order');
const Product = require('../models/Product');

// get a list of actual products
const getProductsData = async (order) => {
  let productsId = [];
  order.dataValues.orderProducts.forEach((el, index) => {
    productsId.push(el.productId);
  });

  // find all products by id
  let products = await Product.findAll({
    attributes: ['id', 'title', 'description', 'price', 'amount', 'discount'],
    where: { id: productsId },
  });

  // create new order object
  order.dataValues.orderProducts = products.map((pr, index) => {
    return { product: pr, amount: order.dataValues.orderProducts[index].amount };
  });

  return order;
};

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
      order = order[0];

      let newOrder = await getProductsData(order);

      res.status(200).json({ order: newOrder });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createOrder(req, res) {
    try {
      let { userId, orderProducts, totalPrice } = req.body;

      const newOrder = await Order.create({
        userId,
        orderProducts,
        totalPrice,
        status: 'Processing',
      });
      //   return res.status(200).json({ msg: 'Successfully added new category' });
      return res.status(200).json({ newOrder });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new orderController();
