const express = require("express");

const {
  getAllUserDetails,
  deleteUser,
  getAllOrderDetails,
  updateOrderStatusToPaid,
  sendEmailToUserOnRegistration,
  createNewLoan,
} = require("../controllers/adminControllers");

const { adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Get all user details
router.route("/allUserDetails").get(adminProtect, getAllUserDetails);

// Delete user account
router.route("/deleteUser/:id").delete(adminProtect, deleteUser);

// Get all order details
router.route("/allOrderDetails").get(adminProtect, getAllOrderDetails);

// Update Order status to paid after the Online Payment is done
router
  .route("/updateOrderStatusToPaid/:id")
  .put(adminProtect, updateOrderStatusToPaid);

router
  .route("/sendEmailToUserOnRegistration")
  .post(adminProtect, sendEmailToUserOnRegistration);

router.route("/createNewLoan").post(adminProtect, createNewLoan);

module.exports = router;
