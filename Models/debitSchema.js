const mongoose = require('mongoose');

// Pump Schema
const debitSchema=mongoose.Schema({
    Date: { type: Date },
    CompanyName: { type: String },
    Site: { type: String},
    Amount: { type: Number }
  }, { timestamps: true });

module.exports=mongoose.model("Debit",debitSchema)
