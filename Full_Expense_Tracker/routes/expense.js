const express = require("express");

const expenseController = require("../controllers/expense");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/allexpensedata",
  authMiddleware.middleGetAll,
  expenseController.getAllExpenseData
);
router.post(
  "/addexpense",
  authMiddleware.middleParseToken,
  expenseController.postAddExpense
);

router.delete("/deleteexpense/:id", expenseController.deleteExpense);

module.exports = router;
