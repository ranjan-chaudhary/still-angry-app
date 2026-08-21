const mongoose = require("mongoose");

const angryMessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AngryMessage = mongoose.model(
  "AngryMessage",
  angryMessageSchema
);

module.exports = AngryMessage;