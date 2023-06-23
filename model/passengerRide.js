const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "passenger",
    required: true,
  },
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ride",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved","Rejected"],
    required: true,
    default: "Pending",
  }
});

module.exports = mongoose.model("passengerRide", dataSchema);
