// All the imports ##############################################################################

const Expense = require("../models/expense");
const User = require("../models/user");

//  The required functions ##############################################################################

// All the exports ##############################################################################
exports.getAllExpenseData = (req, res, next) => {
  const userId = req.headers.userId;
  Expense.findAll({ where: { userId: userId } })
    .then((op) => {
      res.json(op);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddExpense = async (req, res, next) => {
  try {
    const userUpdate = User.findOne({ where: { id: req.body.userId } });
    const expenseCreate = Expense.create(req.body);

    const [op1, op2] = await Promise.all([userUpdate, expenseCreate]);
    let new_total = op1.totalSpendings + req.body.amount
    await op1.update({ totalSpendings: new_total })
    res.json(op2);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  const todel = await Expense.findByPk(id);

  todel.destroy();
  res.json({ msg: "Expense Removed !" });
};
