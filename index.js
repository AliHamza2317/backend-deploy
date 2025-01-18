const express= require("express");


const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const uRoutes = require("./Routes/pupmRoutes");
const allowedOrigins = [
    'https://pump-hicg.vercel.app',
    'https://pump-6vzl.vercel.app',
    'http://localhost:3000', // For local development
  ];
  
  // Use dynamic origin handling
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
