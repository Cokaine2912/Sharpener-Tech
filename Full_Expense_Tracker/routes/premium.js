const express = require("express");

const premiumController = require("../controllers/premium");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/purchase/premium",
  authMiddleware.authenticate,
  premiumController.getPurchasePremium
);
// router.post(
//   "/addexpense",
//   authMiddleware.middleParseToken,
//   expenseController.postAddExpense
// );


module.exports = router;
