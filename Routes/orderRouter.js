const {Router} = require("express");


const orderRouter = new Router();


orderRouter.get("/", (req, res)=>{
	res.status(200).json()
})

orderRouter.get("/get-orders", (req, res) => {
	res.status(200).json({orders: "orders"})
})


module.exports = orderRouter;
