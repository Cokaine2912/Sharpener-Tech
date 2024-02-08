const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use('/admin',adminRoutes); // Filtering Mechanism 
app.use('/shop',shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);
