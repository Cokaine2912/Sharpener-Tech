const Review = require("../models/review");

exports.postReview = (req, res, next) => {
  console.log(req.body);
  Review.create(req.body).then((op) => {
    res.json(op);
  });
};

exports.postFindReview = (req, res, next) => {
  console.log("Company to find is :", req.body.findname);
  Review.findAll({ where: { company: req.body.findname } })
    .then((op) => {
      console.log(op);
      res.json(op);
    })
    .catch((err) => {
      console.log(err);
    });
};
