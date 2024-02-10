const express = require("express");

const router = express.Router();

const rootDir = require("../util/path");

const path = require("path");

router.get("/", (req, res, next) => {
  let p = path.join(rootDir, "../Task5", "views", "shop.html");
  res.sendFile(p);
});

module.exports = router;
