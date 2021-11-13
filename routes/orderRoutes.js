const express = require("express");
const {
  getOrder,
  updateOrderDetails,
  cancelOrder,
  getAllOrdersOfUser,
} = require("../controllers/orderControllers");
const { protect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Get details of a particular order for user
router.route("/userOrder/:id").get(protect, getOrder);

// Get details of all orders for user
router.route("/getAllOrdersOfUser/:id").get(protect, getAllOrdersOfUser);

// Update details of order for user
router.route("/updateOrder/:id").put(protect, updateOrderDetails);

// Update details of order for user
router.route("/cancelOrder/:id").delete(protect, cancelOrder);

module.exports = router;
