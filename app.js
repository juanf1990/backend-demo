// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Enable CORS
app.use(cors());

// Use body-parser to parse JSON in the request body
app.use(bodyParser.json());

// Import and use routes
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);
const postRoutes = require("./routes/post");
app.use("/api/posts", postRoutes);

// Import and use middleware
const authenticate = require("./middleware/authenticate");
app.use(authenticate);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Something went wrong" });
});

module.exports = app;
