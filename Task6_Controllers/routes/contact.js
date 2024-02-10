const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const rootDir = require("../util/path");

const contactController = require("../controllers/contact");

const path = require("path");
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", contactController.getForm);

router.post("/form", contactController.postForm);

module.exports = router;
