const express = require("express");

const bodyParser = require("body-parser");

const router = express.Router();


// /admin/add-product => GET

router.get("/add-product", (req, res, next) => {
  //console.log("In another middleware !");
  res.send(
    '<form action = "/admin/product" method = "POST"><input type="text" name="title">Product<br><br><input type="number" name ="size">Size<br><br><button type="submit">Submit</button></form>'
  );
});


router.use(bodyParser.urlencoded({ extended: false }));


// /admin/product => POST
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/shop");
});

module.exports = router;
