const User = require("../models/user");

const path = require("path");
const e = require("express");
const Appointment = require("../models/user");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "views",
  "users",
  "users.html"
);

exports.getForm = (req, res, next) => {
  // console.log(index);

  res.sendFile(p);
};

exports.getAllUsers = (req, res, next) => {
  let allUsers;
  User.findAll()
    .then((op) => {
      allUsers = op;
      // console.log(op);
      res.json(allUsers);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postForm = (req, res, next) => {
  const form_data = req.body;
  console.log("this is the req body", req.body);
  User.create(req.body)
    .then((op) => {
      // console.log(op);
      res.json(req.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDelete = (req, res, next) => {
  console.log("from post Delete !", req.body);
  User.destroy({ where: { phone: req.body.ID } })
    .then((user) => {
      res.json({ email_id: req.body.ID });
    })
    .catch((err) => {
      conosle.log(err);
    });
};
