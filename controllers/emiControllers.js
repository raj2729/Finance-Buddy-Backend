const asyncHandler = require("express-async-handler");
const EMI = require("../models/emiModel");

// Create EMI - Only for Admin
const addEMI = asyncHandler(async (req, res) => {
  try {
    const {
      user,
      userName,
      loan,
      loanName,
      agentAssigned,
      agent,
      agentName,
      order,
      emiInstallmentNumber,
      inPTP,
      amount,
      isPaid,
      paidAt,
      lastDate,
    } = req.body;

    // console.log(itemsPrice);
    const emi = new EMI({
      user,
      userName,
      loan,
      loanName,
      agentAssigned,
      agent,
      agentName,
      order,
      emiInstallmentNumber,
      inPTP,
      amount,
      isPaid,
      paidAt,
      lastDate,
    });

    const createEMI = await emi.save();

    res.status(201).json({
      _id: createEMI._id,
      user: createEMI.user,
      userName: createEMI.userName,
      loan: createEMI.loan,
      loanName: createEMI.loanName,
      agentAssigned: createEMI.agentAssigned,
      agent: createEMI.agent,
      agentName: createEMI.agentName,
      order: createEMI.order,
      emiInstallmentNumber: createEMI.emiInstallmentNumber,
      inPTP: createEMI.inPTP,
      amount: createEMI.amount,
      isPaid: createEMI.isPaid,
      paidAt: createEMI.paidAt,
      lastDate: createEMI.lastDate,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      data: error,
    });
  }
});

module.exports = {
  addEMI,
};
