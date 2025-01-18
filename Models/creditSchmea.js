const mongoose = require('mongoose');

// Pump Schema
const creditSchema=mongoose.Schema({
    DepositDate: { type: Date },
    SaleDate: { type: Date },
    Name: { type: String, required: true },
    Amount: { type: Number, required: true },
    site: { type: Number, required: true }
  }, { timestamps: true });
  

module.exports=mongoose.model("Credit",creditSchema)
