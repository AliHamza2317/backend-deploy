const express= require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
app.use(bodyParser.json())
const uRoutes = require("./Routes/pupmRoutes");
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
