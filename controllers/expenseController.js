const Expense = require("../models/Expense");
const User = require("../models/User");
const generateCSV = require("../utils/balanceSheet");

// Add new expense
const addExpense = async (req, res) => {
  const {
    amount,
    description,
    paidBy,
    participants,
    splitMethod,
    splitDetails,
  } = req.body;

  if (splitMethod === "percentage") {
    const totalPercentage = Object.values(splitDetails).reduce(
      (a, b) => a + b,
      0
    );
    if (percentage != 100) {
      return res.status(400).json({
        message: "Split percentage must add up to 100%",
      });
    }
  }

  try {
    const expense = new Expense({
      amount,
      description,
      paidBy,
      participants,
      splitMethod,
      splitDetails,
    });
    await expense.save();
    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Retrieve individual user expenses
const getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      participants: req.params.userId,
    }).populate("paidBy");
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("paidBy");
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate balance sheet
const downloadBalanceSheet = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("paidBy");
    const csv = generateCSV(expenses);
    res.header("Content-Type", "text/csv");
    res.attachment("balanceSheet.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addExpense,
  getUserExpenses,
  getAllExpenses,
  downloadBalanceSheet,
};
