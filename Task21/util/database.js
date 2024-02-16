const Sequilize = require("sequelize");

const sequelize = new Sequilize("node-complete", "root", "Sql2835@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
