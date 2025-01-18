const { getpump, addpump, amount, getamount, udhar, credit, debit, getdebit } = require("../Controller/pumpController");

const userRouter=require("express").Router();


userRouter.post('/add',addpump)
userRouter.get('/get',getpump)
userRouter.post('/addamount',amount)
userRouter.get('/getamount',getamount)
userRouter.post('/udhar',udhar)
userRouter.get('/getudhar',udhar)
userRouter.post('/credit',credit)
userRouter.get('/getcredit',credit)
userRouter.post('/debit',debit)
userRouter.get('/getdebit',getdebit)

module.exports=userRouter;


