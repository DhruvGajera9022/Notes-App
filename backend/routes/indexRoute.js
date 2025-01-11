const express = require("express");
const route = express.Router();

const userRoute = require("./userRoute");
const notesRoute = require("./notesRoute");


route.use("/", userRoute);
route.use("/", notesRoute);


module.exports = route;