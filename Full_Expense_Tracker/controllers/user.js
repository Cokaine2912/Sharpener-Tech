const User = require("../models/user");
const bcrypt = require("bcrypt");

function HASHING(password, saltrounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltrounds).then((hash) => {
      resolve(hash);
    });
  });
}

exports.postNewUser = async (req, res, next) => {
  const new_user = req.body;
  const saltrounds = 10;
  const new_pass = await HASHING(new_user.password, saltrounds);
  new_user.password = new_pass;
  User.create(new_user)
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

function DEHASHING(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash).then((op) => {
      resolve(op);
    });
  });
}

exports.postUserLogin = async (req, res, next) => {
  const obj = req.body;
  const email = obj.email;
  const password = obj.password;

  const findings = await User.findAll({ where: { email: email } });

  if (findings.length === 0) {
    res.status(404).json({error : "User Not Found !"});
  } else {
    const hash = findings[0].password;
    const dehash = await DEHASHING(password, hash);
    // console.log(dehash);
    if (!dehash) {
      res.status(400).json({error : "User Not Authorized !"});
    } else {
      res.json({success : "User Login Successful !"});
    }
  }
};
