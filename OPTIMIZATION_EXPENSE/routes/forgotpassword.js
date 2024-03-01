const express = require("express");

const forgotPasswordController = require("../controllers/forgotpassword");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/forgotpassword", forgotPasswordController.postNewPassword);

module.exports = router;
