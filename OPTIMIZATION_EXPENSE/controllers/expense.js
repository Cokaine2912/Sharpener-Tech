// All the imports ##############################################################################

const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

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
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const userUpdate = User.findOne({
      // Promise 1
      where: { id: req.body.userId },
      transaction,
    });

    const expenseCreate = Expense.create(req.body, { transaction }); // Promise 2

    const [op1, op2] = await Promise.all([userUpdate, expenseCreate]);
    let new_total = op1.totalSpendings + +req.body.amount;
    await op1.update({ totalSpendings: new_total }, { transaction });

    await transaction.commit();
    res.json(op2);
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the expense." });
  }
};

exports.deleteExpense = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const id = req.params.id;
    const todel = await Expense.findByPk(id, { transaction }); // Promise 1
    const user_update = await User.findByPk(todel.userId, { transaction }); // Promise 2

    let new_total = user_update.totalSpendings - todel.amount;

    const updatePromise = user_update.update(
      { totalSpendings: new_total },
      { transaction }
    ); // Promise 3
    const deletePromise = todel.destroy({ transaction }); // Promise 4

    await Promise.all([updatePromise, deletePromise]);
    await transaction.commit();

    res.json({ msg: "Expense Removed !" });
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(err);
  }
};
