const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRoutes = require("./routes/login");
const chatRoutes = require("./routes/chat");

app.use(loginRoutes); // Filtering Mechanism
app.use(chatRoutes);

app.get("/", (req, res, next) => {
    let p = path.join(__dirname, "views", "chat.html");
    res.sendFile(p);
  });

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(4000);
