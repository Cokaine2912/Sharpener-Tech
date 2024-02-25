const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

const Expense = require("./models/expense");
const User = require("./models/user");

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: true }));

app.use(userRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
