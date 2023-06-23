const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "car",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }

});

module.exports = mongoose.model("carHasDriver", dataSchema);
