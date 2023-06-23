const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "locations",
    required: true,
  },
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ride",
    required: true,
  },
  position: {
    type: Number,
    required: true,
    default: 1
  
  }

});

module.exports = mongoose.model("locationRide", dataSchema);
