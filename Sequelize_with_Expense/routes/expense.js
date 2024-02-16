const express = require("express");

const expenseController = require("../controllers/expense");

const router = express.Router();

router.get("/tracker", expenseController.getTracker);

router.post("/post-expense", expenseController.postExpense);

router.get("/all-expenses", expenseController.getAllExpenses);

router.post("/delete-expense", expenseController.postDeleteExpense);

module.exports = router;
