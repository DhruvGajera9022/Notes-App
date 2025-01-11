const express = require("express");
const route = express.Router();

const userController = require("../controllers/userController");
const { authenticateToken } = require("../utilities");


// Register route
route.post("/create-account", userController.register);

// Login route
route.post("/login", userController.login);

// Get user data
route.get("/get-user", authenticateToken, userController.userData);



module.exports = route;