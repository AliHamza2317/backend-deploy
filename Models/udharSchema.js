const mongoose = require('mongoose');

// Pump Schema
const udharSchema=mongoose.Schema({
  pumpName: { type: String },
  Date: { type: Date },
  Name: { type: String},
  Amount: { type: Number},
  Description: { type: String }
}, { timestamps: true });


module.exports=mongoose.model("Udhar",udharSchema)
