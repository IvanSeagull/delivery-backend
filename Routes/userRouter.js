const {Router} = require("express");


const userRouter = new Router();


userRouter.get("/", (req, res)=>{
	res.status(200).json()
})

userRouter.get("/get-users", (req, res) => {
	res.status(200).json({users: "users"})
})


module.exports = userRouter;
