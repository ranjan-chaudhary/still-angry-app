const mongoose = require("mongoose");

const surpriseSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Surprise", surpriseSchema);