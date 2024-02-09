const express = require("express");

const router = express.Router();

const path = require("path");

router.post("/chat", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
