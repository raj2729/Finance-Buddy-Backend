const mongoose = require("mongoose");

const emiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    agentAssigned: {
      type: Boolean,
      required: true,
      default: false,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    agentName: {
      type: String,
    },
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Loan",
    },
    loanName: {
      type: String,
      required: true,
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
    inPTP: {
      type: Boolean,
      required: true,
      default: false,
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
    paymentStatus: {
      type: String,
      required: true,
      default: "unpaid",
      // values acceptable here: unpaid, pending, paid
    },
    paidAt: {
      type: String,
    },
    lastDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EMI = mongoose.model("EMI", emiSchema);

module.exports = EMI;
