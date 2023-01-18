const express = require("express");
const router = express.Router();
const db = require("../models");
const controller = require("../controllers/user");

// Get all users
router.get("/", controller.getAllUsers);

// Get one user by id
router.get("/:id", controller.getUser);

// Create a new user
router.post("/signup", controller.createUser);

// Update an existing user
router.put("/:id", controller.updateUser);

// Delete a user
router.delete("/:id", controller.deleteUser);

module.exports = router;
