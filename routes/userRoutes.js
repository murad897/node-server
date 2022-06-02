const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// register user
router.post("/register", userController.registrate_user);

// login user
router.post("/login", userController.login_user);

router.patch("/:id", userController.logout_user);

module.exports = router;
