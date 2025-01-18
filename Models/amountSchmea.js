const mongoose = require('mongoose');

// Pump Schema
const amountSchema=mongoose.Schema({
    name: { type: String },
    Date: { type: Date },
    totalsale: { type: Number, required: true },
    expenditure: { type: Number, required: true }
  }, { timestamps: true });



module.exports=mongoose.model("Amount",amountSchema)
