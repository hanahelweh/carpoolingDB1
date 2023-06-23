const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved","Rejected"],
    required: true,
    default: "Pending",
  }
});

module.exports = mongoose.model("rideRequest", dataSchema);
