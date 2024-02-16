const Sequilize = require("sequelize");

const sequelize = require("../util/database");

const Appointment = sequelize.define("appointment", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequilize.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequilize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Appointment;
