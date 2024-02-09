const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRoutes = require("./routes/login");
const chatRoutes = require("./routes/chat");

app.use(loginRoutes); // Filtering Mechanism
app.use(chatRoutes);

app.get("/", (req, res, next) => {
  let p = path.join(__dirname, "DB/chats.txt");
  // res.sendFile(p);
  // console.log(p);

  fs.readFile(p, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("<h1>Internal Server Error</h1>");
    }

    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write(`<div id="all_chats">${data}</div>`)
    // res.write("<h1>This is the one for testing !</h1>");
    res.write(
      `<form action = "/chat" method = "post" onsubmit='document.getElementById("username").value = localStorage.getItem("username")' ><input type="hidden" id="username" name="name" /><input type="text" name="chat" id="chat" placeholder="message"></input><br><br><button type = "submit">Send</button></form>`
    );
    res.write("</html>");
    return res.end();
  });
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(4000);
