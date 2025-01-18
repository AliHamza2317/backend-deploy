const express=require ("express");
const uRoutes = require("./Routes/pupmRoutes");
const app=express();
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require("dotenv").config();


app.use(cors())
app.use(express.json())



const mongoose = require("mongoose"); 
mongoose.connect("mongodb+srv://hamza:123@cluster0.btxgzbp.mongodb.net/petrolpump").then(()=>{
    console.log("Connected")
}).catch(err=>{
   console.log(err) 
}) 

const port= 3001
app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})

app.use("/pump",uRoutes); 
