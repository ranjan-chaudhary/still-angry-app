const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Letter", letterSchema);