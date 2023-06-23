const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  cities: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("locations", dataSchema);
