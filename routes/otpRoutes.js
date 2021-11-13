const express = require("express");

const {
  sendEmail,
  checkOtp,
  sendMobileOtp,
  checkMobileOtp,
  sendWhatsappMessage,
  sendEmailEMIReminder,
  sendMobileEMIReminder,
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

// Send Whatsapp EMI Reminder
router.route("/sendWhatsappMessage").post(sendWhatsappMessage);

// Send Email EMI Reminder
router.route("/sendEmailEMIReminder").post(sendEmailEMIReminder);

// Send Mobile EMI Reminder
router.route("/sendMobileEMIReminder").post(sendMobileEMIReminder);

module.exports = router;
