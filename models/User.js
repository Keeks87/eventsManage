/*
Filename: User.js

Path: eventsManage/models/User.js

Code: JavaScript code for the user model of the application (eventsManage) is
written in this file. This file contains the schema for the user data. The schema 
defines how the user's information will be stored and retrieved from the database.
The schema is used to create a model, which is exported so that it can be used in 
other parts of the application.
*/

// Code dependencies
const mongoose = require("mongoose");

// Create a schema for the user data
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
