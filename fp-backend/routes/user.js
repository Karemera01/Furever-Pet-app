const express = require("express");

const userController = require("../controllers/user");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/:email", userController.checkPassword);

router.get("", userController.getUsers);

module.exports = router;
