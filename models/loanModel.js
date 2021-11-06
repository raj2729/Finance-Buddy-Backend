const mongoose = require("mongoose");

const loanSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    typeOfLoan: {
      type: String,
      required: true,
    },
    features: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
