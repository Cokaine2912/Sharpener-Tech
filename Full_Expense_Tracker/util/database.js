const Sequilize = require("sequelize");

const sequelize = new Sequilize("expense-tracker", "root", "Sql2835@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
