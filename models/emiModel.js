const mongoose = require("mongoose");

const emiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Loan",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    emiInstallmentNumber: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    lastDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const EMI = mongoose.model("EMI", emiSchema);

module.exports = EMI;
