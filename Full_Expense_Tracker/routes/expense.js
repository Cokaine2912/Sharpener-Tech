const express = require("express");

const expenseController = require("../controllers/expense");

const router = express.Router();

router.get("/allexpensedata",expenseController.getAllExpenseData)
router.post("/addexpense",expenseController.postAddExpense)

router.delete("/deleteexpense/:id",expenseController.deleteExpense)
// router.post();

module.exports = router;
