const mongoose = require('mongoose');

// Pump Schema
const amountSchema=mongoose.Schema({
    name: { type: String },
    Date: { type: Date },
    totalsale: { type: Number},
    expenditure: { type: Number}
  }, { timestamps: true });



module.exports=mongoose.model("Amount",amountSchema)
