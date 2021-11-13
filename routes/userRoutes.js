const express = require("express");

const {
  userLogin,
  getUserDetails,
  updateUserDetails,
  getAllOrderDetailsOfUser,
  getAllEMIDetailsOfALoan,
  getUserDetailsFromAgent,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/protectedRoutes");

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

module.exports = router;
