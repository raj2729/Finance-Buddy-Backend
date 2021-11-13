const express = require("express");

const {
  sendEmail,
  checkOtp,
  sendMobileOtp,
  checkMobileOtp,
  sendWhatsappMessage,
  sendEmailEMIReminder,
  sendMobileEMIReminder,
  sendPaymentLink,
} = require("../controllers/otpControllers");
const { protect } = require("../middlewares/protectedRoutes");

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
router.route("/sendEmailEMIReminder").post(protect, sendEmailEMIReminder);

// Send Mobile EMI Reminder
router.route("/sendMobileEMIReminder").post(sendMobileEMIReminder);

// Send Payment Link
router.route("/sendPaymentLink").post(sendPaymentLink);

module.exports = router;
