const Order = require('../models/Order');
const Product = require('../models/Product');

// get a list of actual products
const getProductsData = async (productList) => {
  let productsId = [];
  productList.forEach((el) => {
    productsId.push(el.productId);
  });

  // find all products by id
  let products = await Product.findAll({
    attributes: ['id', 'title', 'description', 'price', 'amount', 'discount'],
    where: { id: productsId },
  });

  // create new order object
  newProductsList = products.map((pr, index) => {
    return { product: pr.dataValues, amount: productList[index].amount };
  });
  return newProductsList;
};

const calculateTotalPrice = async (productList) => {
  let totalPrice = 0;
  const actualProducts = await getProductsData(productList);
  actualProducts.forEach((pr) => {
    totalPrice += pr.product.price * pr.amount;
  });
  return totalPrice;
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

      order.dataValues.orderProducts = await getProductsData(order.dataValues.orderProducts);

      res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async createOrder(req, res) {
    try {
      let { userId, orderProducts } = req.body;

      let totalPrice = await calculateTotalPrice(orderProducts);

      const newOrder = await Order.create({
        userId,
        orderProducts,
        totalPrice,
        status: 'Processing',
      });

      return res.status(200).json({ newOrder });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new orderController();
