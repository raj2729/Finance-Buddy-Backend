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

// Get details of all Loans for user - Only logged in users
const getAllLoansOfUser = asyncHandler(async (req, res) => {
  const ID = req.params.id;
  const userId = req.user._id.toString();
  const orders = await Order.find({ user: req.user._id });
  if (orders.length > 0) {
    res.status(200).json({ success: true, data: orders });
  } else {
    res.status(404).json({
      success: false,
      message: "No orders found",
    });
  }
});

// Get details of all Loans for user - Only logged in users
const getAllEMIOfLoanOfUser = asyncHandler(async (req, res) => {
  // const userId = req.user._id.toString();
  const emisOfLoan = await Order.find({
    user: req.user._id,
    loan: req.params.id,
  });
  if (emisOfLoan.length > 0) {
    res.status(200).json({ success: true, data: emisOfLoan });
  } else {
    res.status(404).json({
      success: false,
      message: "No emisOfLoan found",
    });
  }
});

module.exports = {
  createNewLoan,
  getAllLoansOfUser,
  getAllEMIOfLoanOfUser,
};
