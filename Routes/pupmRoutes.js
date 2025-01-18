const { getpump, addpump } = require("../Controller/pumpController");

const userRouter=require("express").Router();


userRouter.get('/add',addpump)
userRouter.get('/get',getpump)


module.exports=userRouter;


