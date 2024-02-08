const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", (req, res, next) => {
  console.log("This always runs !");
  next();
});

app.use("/add-product", (req, res, next) => {
  //console.log("In another middleware !");
  res.send(
    '<form action = "/product" method = "POST"><input type="text" name="title">Product<br><br><input type="number" name ="size">Size<br><br><button type="submit">Submit</button></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  //console.log("In another middleware !");
  res.send("<h1>Hello From Express !</h1>");
});

app.listen(3000);
