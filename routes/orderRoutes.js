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

module.exports = router;
