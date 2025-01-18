const express= require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
app.use(bodyParser.json())
const uRoutes = require("./Routes/pupmRoutes");
app.use(cors({
    origin: 'https://pump-hicg.vercel.app', // Allow requests only from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));
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
