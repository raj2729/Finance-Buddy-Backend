const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Loan = require("../models/loanModel");
const nodemailer = require("nodemailer");
const EMI = require("../models/emiModel");

/*
List of Controllers
1. Get all user details
2. Delete an account
3. Get all order details --- change order to loan
4. Update EMI status to paid
5. sendEmailToUserOnRegistration
6. createNewLoan
*/
// Get all user details - Admin Protected Route
const getAllUserDetails = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" });
  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(400).json({
      message: "No user found",
    });
  }
});

// Get all agent details - Admin Protected Route
const getAllAgentDetails = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "agent" });
  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(400).json({
      message: "No user found",
    });
  }
});

// Delete a user account - Admin Protected Route
const deleteUser = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id);
  if (userExists) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User Account deleted successfully",
    });
  } else {
    res.status(400).json({
      message: "No user found",
    });
  }
});

// Get all order details - Admin Protected Route
const getAllOrderDetails = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders.length > 0) {
    res.status(200).json(orders);
  } else {
    res.status(400).json({
      message: "No Order found",
    });
  }
});

// Update Order status to paid after the Online Payment is done
const updateOrderStatusToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.currentStatus = "Order is received and is being processed";
    order.paidAt = new Date();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400).json({
      message: "No Order found",
    });
  }
});

const sendEmailToUserOnRegistration = asyncHandler(async (req, res) => {
  const {
    email,
    name,
    customerEmailId,
    password,
    role,
    mobileNumber,
    address,
    profilePicture,
    propertyArea,
    applicantIncome,
    isSelfEmployed,
    cibilScore,
    dependents,
  } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      customerEmailId,
      password,
      role,
      mobileNumber,
      address,
      profilePicture,
      propertyArea,
      applicantIncome,
      isSelfEmployed,
      cibilScore,
      dependents,
    });
    // const userId = user._id;
    if (user) {
      const output = `
      '<h2>Welcome to Finance Buddy</h2>
    <p>You have registeration has been successful</p>
    <h3>Your Details:</h3>
    <ul>
      <li>Name : ${req.body.name}</li>
      <li>Email : ${req.body.email}</li>
      <li>Customer Email Id : ${req.body.customerEmailId}</li>
      <li>Mobile Number : ${req.body.mobileNumber}</li>
      <li>Password : ${req.body.password}</li>
      <li>Address : ${req.body.address}</li>
      <li>Property Area : ${req.body.propertyArea}</li>
      <li>Income Details : ${req.body.applicantIncome}</li>
      <li>Cibil Score : ${req.body.cibilScore}</li>
      <li>Dependents : ${req.body.dependents}</li>
    </ul>
    <p>Please save your account details for future references</p>
    <p></p>
    <p>Regards</p>
    <p>Team Finance Buddy</p>
  `;
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: `${process.env.CODEMOON_EMAIL}`, // generated ethereal user
          pass: `${process.env.CODEMOON_PASSWORD}`, // generated ethereal password
        },
        // If on localhost
        tls: {
          rejectUnauthorized: false,
        },
        service: "gmail",
      });

      // send mail with defined transport object
      let mailOptions = {
        // from: '"Nodemailer Testing" <raj.sanghavi1@svkmmumbai.onmicrosoft.com>', // sender address
        from: "Team Finance Buddy",
        to: `${user.email}`, // list of receivers
        subject: "Registration Successful ✔", // Subject line
        // text: "Hello world?", // plain text body
        // html: "<b>Hello world?</b>", // html body
        html: output,
        // attachments: [
        //   {
        //     path: "/home/ubuntu/MYFOLDER/Cloned/E-Commerce/frontend/public/images/alexa.jpg",
        //   },
        // ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json(error);
        } else {
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.status(201).json({
            success: true,
            emailSuccess: true,
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              customerEmailId: user.customerEmailId,
              role: user.role,
              mobileNumber: user.mobileNumber,
              address: user.address,
              applicantIncome: user.applicantIncome,
              customerEmailId: user.customerEmailId,
              isSelfEmployed: user.isSelfEmployed,
              cibilScore: user.cibilScore,
              dependents: user.dependents,
              message: "User Register Successful",
            },
          });
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not created",
      });
    }
  }
});

const createNewLoan = asyncHandler(async (req, res) => {
  const { name, description, typeOfLoan, features } = req.body;
  const loan = await Loan.create({
    name,
    description,
    typeOfLoan,
    features,
  });
  if (loan) {
    res.status(201).json({
      success: true,
      data: {
        _id: loan._id,
        name: loan.name,
        description: loan.description,
        typeOfLoan: loan.typeOfLoan,
        features: loan.features,
        message: "Loan added successfully",
      },
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Loan not added successfully",
    });
  }
});

const getAllEMIS = asyncHandler(async (req, res) => {
  const emis = await EMI.find({});
  if (emis.length > 0) {
    res.status(200).json({ success: true, data: emis });
  } else {
    res.status(404).json({
      success: false,
      message: "No emis found",
    });
  }
});

module.exports = {
  getAllUserDetails,
  deleteUser,
  getAllOrderDetails,
  updateOrderStatusToPaid,
  sendEmailToUserOnRegistration,
  createNewLoan,
  getAllAgentDetails,
  getAllEMIS,
};
