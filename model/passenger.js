const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  
  passengerRate: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
});
module.exports = mongoose.model("passenger", dataSchema);