const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Loan = require("../models/loanModel");

const createNewLoan = asyncHandler(async (req, res) => {
  const { name, description, typeOfLoan, features } = req.body;
  const loan = await Loan.create({
    name,
    description,
    typeOfLoan,
    features,
  });
  if (loan) {
    res.status(201).json({
      success: true,
      data: {
        _id: loan._id,
        name: loan.name,
        description: loan.description,
        typeOfLoan: loan.typeOfLoan,
        features: loan.features,
        message: "Loan added successfully",
      },
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Loan not added successfully",
    });
  }
});

module.exports = {
  createNewLoan,
};
