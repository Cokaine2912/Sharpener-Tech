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

exports.postUserLogin = async (req, res, next) => {
  const obj = req.body;
  const email = obj.email;
  const password = obj.password;

  const findings = await User.findAll({ where: { email: email } });

  try {
    if (findings.length === 0) {
      res.json({ error: "Email not Found" });
    } else {
      if (findings[0].password !== password) {
        res.json({ error: "Password doesn't match" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
