const express = require("express");

const path = require("path");

const rootDir = require("../util/path")

const bodyParser = require("body-parser");

const router = express.Router();

// /admin/add-product => GET

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "../Task5", "views", "add-product.html"));
});

router.use(bodyParser.urlencoded({ extended: false }));

// /admin/product => POST
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
