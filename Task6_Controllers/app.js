const express = require("express");

const bodyParser = require("body-parser");
const rootDir = require("./util/path");

const errorController = require("../Task6_Controllers/controllers/error");
const homeController = require("./controllers/home");

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

app.get("/", homeController.showHome);

app.use(errorController.showError);

app.listen(5000);
