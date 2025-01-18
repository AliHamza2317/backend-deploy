const mongoose = require('mongoose');

// Pump Schema
const udharSchema=mongoose.Schema({
    pumpName: { type: String },
  Date: { type: Date },
  Name: { type: String, required: true },
  Amount: { type: Number, required: true },
  Description: { type: String, required: true }
}, { timestamps: true });


module.exports=mongoose.model("Udhar",udharSchema)
