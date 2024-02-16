const Sequilize = require("sequelize");

const sequelize = require("../util/database");

const Expense = sequelize.define("expense", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequilize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequilize.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
