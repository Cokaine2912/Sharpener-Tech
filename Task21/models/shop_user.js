const Sequilize = require("sequelize");

const sequelize = require("../util/database");

const ShopUser = sequelize.define("shopuser", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequilize.STRING,
  email: Sequilize.STRING,
});

module.exports = ShopUser;
