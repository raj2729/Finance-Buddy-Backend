const express = require("express");

const {
  sendEmail,
  checkOtp,
  sendMobileOtp,
  checkMobileOtp,
  sendWhatsappMessage,
} = require("../controllers/otpControllers");

const router = express.Router();

// Send email of otp
router.route("/sendEmail").post(sendEmail);

// Check otp
router.route("/checkOtp").post(checkOtp);

// Send message of otp
router.route("/sendMobileOtp").post(sendMobileOtp);

// Check mobile otp
router.route("/checkMobileOtp").post(checkMobileOtp);

// Send Whatsapp message
router.route("/sendWhatsappMessage").post(sendWhatsappMessage);

module.exports = router;
