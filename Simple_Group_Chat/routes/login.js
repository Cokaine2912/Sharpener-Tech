const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json()); // Add this line if you're expecting JSON data

router.get("/login", (req, res, next) => {
  // console.log(req.body);
  res.sendFile(path.join(__dirname, "../", "views", "login.html"));
});

router.post("/username", (req, res, next) => {
  console.log(req.body);

  let obj = req.body;

  // localStorage.setItem("username", obj[username]);

  res.redirect("/");
});

module.exports = router;
