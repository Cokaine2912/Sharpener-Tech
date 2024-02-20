const Sequilize = require("sequelize");

const sequelize = require("../util/database");

const Review = sequelize.define("review", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  company: { type: Sequilize.STRING, allowNull: false },
  pros: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  cons: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequilize.INTEGER,
    allowNull: false,
  },
});

module.exports = Review;
