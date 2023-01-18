const express = require("express");
const router = express.Router();
const db = require("../models");
const controller = require("../controllers/post");

// Get all posts
router.get("/", controller.getAllPosts);

// Get one post by id
router.get("/:id", controller.getPost);

// Create a new post
router.post("/new", controller.createPost);

// Update an existing post
router.put("/:id", controller.updatePost);

// Delete a post
router.delete("/:id", controller.deletePost);

module.exports = router;
