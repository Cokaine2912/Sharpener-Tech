const express = require("express");

const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/chat", (req, res, next) => {
  // console.log(req.body)
  let to_append = `${req.body['name']}: ${req.body['chat']}`
  

  // Convert req.body to a string
  const dataToAppend = to_append + " | "; // Add newline for formatting if needed

  // Define the file path
  const filePath = path.join(__dirname, "../DB/chats.txt");

  // Append new data to the file
  fs.appendFile(filePath, dataToAppend, (err) => {
    if (err) {
      console.error("Error appending data to file:", err);
      return res.status(500).send("Error appending data to file");
    }
    console.log("Data appended to file successfully");
    // Redirect the user to "/"
    res.redirect("/");
  });
});

module.exports = router;
