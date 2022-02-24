const {Router} = require("express");

const mainRouter = new Router();

const itemRouter = require("./Routes/itemRouter")
const orderRouter = require("./Routes/orderRouter")
const userRouter = require("./userRouter")





mainRouter.get("/", (req,res)=> {
	res.status(200).json({msg: "api router"})
})
mainRouter.use("/items",itemRouter)
mainRouter.use("/orders",orderRouter)
mainRouter.use("/users",userRouter)


module.exports = mainRouter;
