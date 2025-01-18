const mongoose = require('mongoose');

// Pump Schema
const debitSchema=mongoose.Schema({
    Date: { type: Date },
    CompanyName: { type: String, required: true },
    Site: { type: Number, required: true },
    Amount: { type: Number, required: true }
  }, { timestamps: true });

module.exports=mongoose.model("Debit",debitSchema)
