const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const premiumRoutess = require("./routes/premium");
const forgotRoutes = require("./routes/forgotpassword");

const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/order");

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: true }));

app.use(userRoutes);
app.use("/expense", expenseRoutes);
app.use(premiumRoutess);
app.use("/password", forgotRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
