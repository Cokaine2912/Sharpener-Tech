const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const rootDir = require("../util/path");

const path = require("path");
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  let p = path.join(rootDir, "../Task5", "views", "contact.html");
  res.sendFile(p);
});

router.post("/form", (req, res, next) => {
  console.log(req.body);
  let success_page = path.join(rootDir, "../Task5", "views", "success.html");
  res.sendFile(success_page);
});

module.exports = router;
