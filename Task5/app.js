const express = require("express");

const bodyParser = require("body-parser");
const rootDir = require("./util/path");
const app = express();
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactRoutes = require("./routes/contact");

app.use("/add-product", adminRoutes); // Filtering Mechanism
app.use("/shop", shopRoutes);
app.use("/contact-us", contactRoutes);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); // This is a Static Middleware pointing to the public folder

app.get("/", (req, res) => {
  let home = path.join(__dirname, "views", "home.html");
  res.sendFile(home);
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(5000);
