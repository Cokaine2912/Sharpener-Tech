const Expense = require("../models/expense");

const path = require("path");
const e = require("express");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "views",
  "expense",
  "index.html"
);

exports.getTracker = (req, res, next) => {
  res.sendFile(p);
};

exports.postExpense = (req, res, next) => {
  // console.log(req.body);
  Expense.create(req.body)
    .then((op) => {
      console.log("Expense Pushed to the Database");
      res.json(op);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllExpenses = (req, res, next) => {
  let allExpenses;
  Expense.findAll()
    .then((op) => {
      allExpenses = op;
      res.json(allExpenses);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteExpense = (req, res, next) => {
  // console.log("to del id is :",req.body.id)
  Expense.destroy({ where: { id: req.body.id } })
    .then((exp) => {
      res.json({ msg: `id = ${req.body.id} deleted` });
    })
    .catch((err) => console.log(err));
};
