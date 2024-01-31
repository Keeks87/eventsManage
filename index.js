/*
Filename: index.js

Path: eventsManage/index.js

Code: JavaScript code for the server of the application (eventsManage) is
written in this file. This file contains all the necessary functions to handle
client requests and manage event data. The server is started on port 5000. The
server uses Express framework, which provides a simple way to create web
applications.
*/

// Code dependencies
require('dotenv').config()

// Code dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

// Server setup
const app = express();

// Middleware configuration
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// MongoDB connection
mongoose.connect(
  "mongodb+srv://keenandup87:1234@cluster0.50yztom.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// Routes
app.use(routes);

// Server start
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
