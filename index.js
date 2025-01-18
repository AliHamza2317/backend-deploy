const express= require("express");

const app = express();
const cors = require("cors")
// app.use(bodyParser.json())
const uRoutes = require("./Routes/pupmRoutes");
app.use(cors())
app.use(express.json())


app.listen(process.env.PORT || 3001,()=>{
    console.log(`App listening on port ${process.env.PORT}`)
})

app.use("/get",uRoutes); 
