const express = require("express");
const {
  addExpense,
  getUserExpenses,
  getAllExpenses,
  downloadBalanceSheet,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", addExpense);
router.get("/:userId", getUserExpenses);
router.get("/", getAllExpenses);
router.get("/balance-sheet/download", downloadBalanceSheet);


module.exports = router;