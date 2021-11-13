const asyncHandler = require("express-async-handler");
// const { createStore } = require("redux");
const Order = require("../models/orderModel");
// const mongoose = require("mongoose");

// Create order - Only for logged in users
const addOrder = asyncHandler(async (req, res) => {
  const { user, userName, loan, loanName, totalInstallments } = req.body;

  // console.log(itemsPrice);
  const order = new Order({
    user,
    userName,
    loan,
    loanName,
    totalInstallments,
  });

  const createOrder = await order.save();

  res.status(201).json({
    _id: createOrder._id,
    user: createOrder.user,
    userName: createOrder.userName,
    loan: createOrder.loan,
    loanName: createOrder.loanName,
    totalInstallments: createOrder.totalInstallments,
  });
});

// Get details of a particular order for user - Only logged in users
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = req.user;
  if (order) {
    // console.log(order.user.toString());
    // console.log(user._id.toString());
    if (order.user.toString() === user._id.toString()) {
      res.status(200).json(order);
    } else {
      res.status(404).json({
        message: "User not authorized to view this order details",
      });
    }
  } else {
    res.status(404).json({
      message: "No Order found",
    });
  }
});

// Get details of all orders for user - Only logged in users
const getAllOrdersOfUser = asyncHandler(async (req, res) => {
  const ID = req.params.id;
  const userId = req.user._id.toString();
  const orders = await Order.find({ user: userId });
  if (orders.length > 0) {
    res.status(200).json({ success: true, data: orders });
  } else {
    res.status(404).json({
      success: false,
      message: "No Orders found",
    });
  }
});

// Get details of all orders of all users - Only logged in users
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders.length > 0) {
    res.status(200).json({ success: true, data: orders });
  } else {
    res.status(404).json({
      success: false,
      message: "No Orders found",
    });
  }
});

// Update order details - logged in users
const updateOrderDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.body.orderItems) {
      order.orderItems = req.body.orderItems;
      var itemsPrice = Number(
        req.body.orderItems.reduce((acc, item) => acc + item.price, 0)
      );
      order.itemsPrice = itemsPrice;
      var taxPrice = Number(0.15 * itemsPrice);
      order.taxPrice = taxPrice;
      var shippingPrice = Number(itemsPrice > 500 ? 0 : 50);
      order.shippingPrice = shippingPrice;
      var totalPrice =
        Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice);
      order.totalPrice = totalPrice;
    }
    if (req.body.shippingAddress) {
      order.shippingAddress = req.body.shippingAddress;
    }
    if (req.body.paymentMethod) {
      order.paymentMethod = req.body.paymentMethod;
    }

    const updatedOrder = await order.save();
    res.json({
      updatedOrder,
      message: "Order details updated successfully",
    });
  } else {
    // ERROR
    res.status(400).json({
      message: "Order not Found",
    });
  }
});

// Cancel Order - logged in users
const cancelOrder = asyncHandler(async (req, res) => {
  const orderExists = await Order.findById(req.params.id);
  if (orderExists) {
    if (orderExists.user.toString() === req.user._id.toString()) {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Order cancelled successfully",
      });
    } else {
      res.status(404).json({
        message: "User not authorized to delete this order",
      });
    }
  } else {
    // ERROR
    res.status(400).json({
      message: "No order found",
    });
  }
});

module.exports = {
  addOrder,
  getOrder,
  getAllOrdersOfUser,
  updateOrderDetails,
  cancelOrder,
  getAllOrders,
};
