// All the imports ##############################################################################

const Expense = require("../models/expense");

//  The required functions ##############################################################################

// All the exports ##############################################################################
exports.getAllExpenseData = (req, res, next) => {
  Expense.findAll()
    .then((op) => {
      res.json(op);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddExpense = (req, res, next) => {
  Expense.create(req.body)
    .then((op) => {
      res.json(op);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  const todel = await Expense.findByPk(id);

  todel.destroy();
  res.json({ msg: "Expense Removed !" });
};
