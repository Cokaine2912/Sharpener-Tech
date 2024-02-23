const User = require("../models/user");

exports.postNewUser = (req, res, next) => {
  User.create(req.body)
    .then((op) => {
      res.json(op);
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.json({ error: "email already registered ! " });
      } else {
        console.log(err);
      }
    });
};
