const express = require("express");

const reviewController = require("../controllers/review");

const router = express.Router();

router.post("/add-review", reviewController.postReview);

router.post("/find-review", reviewController.postFindReview);

module.exports = router;
