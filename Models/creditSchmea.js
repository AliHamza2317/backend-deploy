const mongoose = require('mongoose');

// Pump Schema
const creditSchema=mongoose.Schema({
    DepositDate: { type: Date },
    SaleDate: { type: Date },
    Name: { type: String},
    Amount: { type: Number },
    site: { type: String}
  }, { timestamps: true });
  

module.exports=mongoose.model("Credit",creditSchema)
