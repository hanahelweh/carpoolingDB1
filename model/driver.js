const mongoose = require("mongoose");

const dataSchema  = new mongoose.Schema({
  driverLicenseImage: {
    type: String,
    required: true,
  },
  driverLicenseType: {
    type: String,
    enum: ["private", "bus"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  driverRate: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  },
});

module.exports = mongoose.model("Driver", dataSchema);