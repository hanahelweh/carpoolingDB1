const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rideDate:{
    type:Date,
    required:true,
  },
  rideTime:{
    type:String,
    required:true,
  },
  FromLocation:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: true,
  },
  ToLocation:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: true,
  },
  estimatedDuration:{
    type:String,
    required:true,
  },
});

module.exports = mongoose.model("ride", dataSchema);
