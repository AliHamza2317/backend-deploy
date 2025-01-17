const mongoose = require('mongoose');


// Pump Schema
const PumpSchema=mongoose.Schema({
  name: { type: String}, // Salarwala, ChakJhumra, Balair
  petrolDate: { type: Date },
  petrolDelivery: { type: Number },
  petrolSale: { type: Number },
  dieselDate: { type: Date },
  dieselDelivery: { type: Number },
  dieselSale: { type: Number },
  mobileOilDate: { type: Date },
  mobileOilDelivery: { type: Number },
  mobileOilSale: { type: Number }
}, { timestamps: true });



module.exports=mongoose.model("Pump",PumpSchema)
