const mongoose = require("mongoose");

const emiSchema = mongoose.Schema(
  {
    user: {
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
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const EMI = mongoose.model("EMI", emiSchema);

module.exports = EMI;
