const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  carType: {
    type: String,
    required: true,
  },
  carModel: {
    type: Number,
    required: true,
  },
  carCondition: {
    type: String,
    enum: ["Good", "Bad"],
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  luggageAvailable: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  carInsuranceImage: {
    type: String,
    required: true,
  }


});

module.exports = mongoose.model("car", dataSchema);
