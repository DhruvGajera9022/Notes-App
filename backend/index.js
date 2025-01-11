const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const config = require("./config.json");

const routes = require("./routes/indexRoute");


// Mongodb connection
mongoose.connect(config.connectionString);


// Middleware
app.use(express.json());


// Cors for frontend
app.use(cors());


// Get all routes
app.use("/", routes);


app.listen(8002, () => {
    console.log(`Server started at ${process.env.URL}${process.env.PORT}`);
})