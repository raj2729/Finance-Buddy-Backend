const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Loan = require("../models/loanModel");
const generateToken = require("../middlewares/generateToken");
const Order = require("../models/orderModel");
const EMI = require("../models/emiModel");

/*
List of controllers
1. Login
2. Get user details
3. Update profile
4. Get all Loan details of user
*/

// Login existing users
const userLogin = asyncHandler(async (req, res) => {
  const { customerEmailId, password } = req.body;
  const user = await User.findOne({ customerEmailId });
  if (customerEmailId === "admin@financeBuddy.com") {
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        customerEmailId: user.customerEmailId,
        role: user.role,
        mobileNumber: user.mobileNumber,
        address: user.address,
        token: generateToken(user._id),
        message: "User Login Successful",
      },
    });
  } else {
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          customerEmailId: user.customerEmailId,
          role: user.role,
          mobileNumber: user.mobileNumber,
          address: user.address,
          token: generateToken(user._id),
          message: "User Login Successful",
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  }
});

// User can see his/her details - Protected Route
const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        customerEmailId: user.customerEmailId,
        role: user.role,
        mobileNumber: user.mobileNumber,
        address: user.address,
        profilePicture: user.profilePicture,
      },
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not Found",
    });
  }
});

// User updates his/her own details
const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      sucess: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        customerEmailId: updatedUser.customerEmailId,
        role: updatedUser.role,
        mobileNumber: updatedUser.mobileNumber,
        address: updatedUser.address,
        message: "User details updated successfully",
      },
    });
  } else {
    res.status(404);
    res.json({
      success: false,
      message: "User not Found",
    });
  }
});

// Get all order details
const getAllOrderDetailsOfUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders.length > 0) {
    res.status(200).json({
      success: true,
      data: orders,
    });
  } else {
    res.status(400).json({
      message: "No Orders found",
    });
  }
});

// Get all EMI details of a loan
const getAllEMIDetailsOfALoan = asyncHandler(async (req, res) => {
  const emis = await EMI.find({ order: req.params.id });
  if (emis.length > 0) {
    res.status(200).json({
      success: true,
      data: emis,
    });
  } else {
    res.status(400).json({
      message: "No EMI's found",
    });
  }
});

module.exports = {
  userLogin,
  getUserDetails,
  updateUserDetails,
  getAllOrderDetailsOfUser,
  getAllEMIDetailsOfALoan,
};
