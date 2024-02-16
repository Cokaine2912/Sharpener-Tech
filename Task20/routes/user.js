const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/form", userController.getForm);

router.get("/all-users", userController.getAllUsers);

router.post("/post-form", userController.postForm);

router.post("/delete-product", userController.postDelete);

module.exports = router;
