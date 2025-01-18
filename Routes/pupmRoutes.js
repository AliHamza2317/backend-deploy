const { second, first } = require("../Controller/pumpController");

const userRouter=require("express").Router();


userRouter.get('/first',first)
userRouter.get('/second',second)

module.exports=userRouter;


