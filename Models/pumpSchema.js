const mongoose = require('mongoose');


// Pump Schema
const PumpSchema=mongoose.Schema({
  name: { type: String }, // Salarwala, ChakJhumra, Balair
  petrolDate: { type: Date },
  petrolDelivery: { type: Number },
  petrolSale: { type: Number },
  petrolStockOriginal: { type: Number, default: 0 },
  dieselDate: { type: Date },
  dieselDelivery: { type: Number },
  dieselSale: { type: Number },
  dieselStockOriginal: { type: Number, default: 0 },
  mobileOilDate: { type: Date },
  mobileOilDelivery: { type: Number },
  mobileOilSale: { type: Number },
  mobileOilStockOriginal: { type: Number, default: 0 },
}, { timestamps: true });



module.exports=mongoose.model("Pump",PumpSchema)
