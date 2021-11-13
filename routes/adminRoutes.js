const express = require("express");

const {
  getAllUserDetails,
  deleteUser,
  getAllOrderDetails,
  updateOrderStatusToPaid,
  sendEmailToUserOnRegistration,
  createNewLoan,
  getAllAgentDetails,
  getAllEMIS,
  getPTPList,
} = require("../controllers/adminControllers");
const { addEMI } = require("../controllers/emiControllers");
const { addOrder, getAllOrders } = require("../controllers/orderControllers");

const { adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Get all user details
router.route("/allUserDetails").get(adminProtect, getAllUserDetails);

// Get all agent details
router.route("/getAllAgentDetails").get(adminProtect, getAllAgentDetails);

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

// Create new order
router.route("/addOrder").post(adminProtect, addOrder);

// Create new EMI
router.route("/addEMI").post(adminProtect, addEMI);

// Get all orders
router.route("/getAllOrders").get(adminProtect, getAllOrders);

// Get all emis
router.route("/getAllEMIS").get(getAllEMIS);

// Get PTPList
router.route("/getPTPList").get(getPTPList);

module.exports = router;
