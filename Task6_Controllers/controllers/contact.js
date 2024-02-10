const path = require("path");
const rootDir = require("../util/path");

exports.getForm = (req, res, next) => {
  let p = path.join(rootDir, "views", "contact.html");
  res.sendFile(p);
};

exports.postForm = (req, res, next) => {
  console.log(req.body);
  let success_page = path.join(rootDir, "views", "success.html");
  res.sendFile(success_page);
};
