const asyncHandler = require("express-async-handler");
// const { createStore } = require("redux");
const TODO = require("../models/todoModel");
// const mongoose = require("mongoose");

// Create Todo - Only for logged in users
const addTodo = asyncHandler(async (req, res) => {
  const { description } = req.body;

  const todo = new TODO({
    user: req.user._id,
    description,
    addedAt: new Date(),
  });

  const createTodo = await todo.save();

  res.status(201).json({
    success: true,
    data: {
      _id: createTodo._id,
      user: createTodo.user,
      description: createTodo.description,
      addedAt: createTodo.addedAt,
    },
  });
});

// Get details of all orders for user - Only logged in users
const getAllTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();
  const todos = await TODO.find({ user: userId });
  if (todos.length > 0) {
    res.status(200).json({
      success: true,
      data: todos,
    });
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
  addTodo,
  getAllTodos,
  updateOrderDetails,
  cancelOrder,
};
