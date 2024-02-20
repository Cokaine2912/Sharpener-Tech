const path = require("path");
const cors = require("cors");

const express = require("express"); // IMP
const bodyParser = require("body-parser"); // IMP

// const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const reviewRoutes = require("./routes/review.js");
const app = express(); // IMP
app.use(cors());

app.use(bodyParser.json({ extended: false })); // IMP
app.use(express.static(path.join(__dirname, "public")));

app.use(reviewRoutes);
// app.use(shopRoutes);
// app.use(userRoutes);


sequelize
  .sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
