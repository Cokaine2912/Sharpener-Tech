const cors = require("cors");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const sequelize = require("./util/database");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const premiumRoutess = require("./routes/premium");
const forgotRoutes = require("./routes/forgotpassword");

const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/order");
const Forgot = require("./models/forgot");
const Download = require("./models/userdownlaod");

const app = express();

app.use(cors());
app.use(helmet());
// app.use(compression());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json({ extended: true }));

app.use(userRoutes);
app.use("/expense", expenseRoutes);
app.use(premiumRoutess);
app.use("/password", forgotRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgot);
Forgot.belongsTo(User);

User.hasMany(Download);
Download.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
