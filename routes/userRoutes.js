const express = require("express");
const {
  updateEMIToPending,
  addEMIToPTP,
} = require("../controllers/emiControllers");
const {
  getAllLoansOfUser,
  getAllEMIOfLoanOfUser,
} = require("../controllers/loanControllers");

const {
  userLogin,
  getUserDetails,
  updateUserDetails,
  getAllOrderDetailsOfUser,
  getAllEMIDetailsOfALoan,
  getUserDetailsFromAgent,
  getAllAssignedEMISOFAgent,
  getAllUnpaidAssignedEMISOFAgent,
  getAllPaidEmisOfUserFromUser,
  getAllPaidEmisOfUserFromAdmin,
} = require("../controllers/userControllers");

const { protect, adminProtect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Post user auth
router.route("/login").post(userLogin);

// User gets his/her own details
router.route("/userDetails").get(protect, getUserDetails);

// User updates his/her own details
router.route("/userUpdate").put(protect, updateUserDetails);

// Get all Order details
router.route("/userOrderDetails").get(protect, getAllOrderDetailsOfUser);

// Get all EMI details of a loan
router.route("/userEMIDetails/:id").get(protect, getAllEMIDetailsOfALoan);

// Get particular user from agent
router
  .route("/getUserDetailsFromAgent/:id")
  .get(protect, getUserDetailsFromAgent);

// Get all assigned EMI details to Agent
router
  .route("/getAllAssignedEMISOFAgent")
  .get(protect, getAllAssignedEMISOFAgent);

// Get all unpaid assigned EMI details to Agent
router
  .route("/getAllUnpaidAssignedEMISOFAgent")
  .get(protect, getAllUnpaidAssignedEMISOFAgent);

// Get all Paid EMI details of a user - ADMIN Side
router
  .route("/getAllPaidEmisOfUserFromAdmin/:id")
  .get(getAllPaidEmisOfUserFromAdmin);

// Get all Paid EMI details of a user - USER Side
router
  .route("/getAllPaidEmisOfUserFromUser")
  .get(protect, getAllPaidEmisOfUserFromUser);

// Agent - Update EMI status to pending after sending payment link
router.route("/updateEMIToPending/:id").put(protect, updateEMIToPending);

// Agent - Add EMI to PTP
router.route("/addEMIToPTP/:id").put(protect, addEMIToPTP);

// Get all Loans of User - Logged in user
router.route("/getAllLoansOfUser").get(protect, getAllLoansOfUser);

// Get all EMI's of loans of User - Logged in user
router.route("/getAllEMIOfLoanOfUser/:id").get(protect, getAllEMIOfLoanOfUser);

module.exports = router;
