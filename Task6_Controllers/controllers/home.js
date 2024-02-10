const path = require("path");

exports.showHome = (req, res) => {
  let home = path.join(__dirname, "../views", "home.html");
  res.sendFile(home);
};
