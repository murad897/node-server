const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// register user
router.post("/register", userController.registrate_user);
router.post("/login", userController.login_user);

// login user

module.exports = router;
