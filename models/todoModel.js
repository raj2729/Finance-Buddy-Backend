const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    addedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const TODO = mongoose.model("TODO", todoSchema);

module.exports = TODO;
