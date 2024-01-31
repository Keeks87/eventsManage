/*
Filename: Event.js

Path: eventsManage/models/Event.js

Code: JavaScript code for the event model of the application (eventsManage) is
written in this file. This file contains the schema for the event data. The
schema defines how the event's information will be stored and retrieved from the
database. The schema is used to create a model, which is exported so that it can
be used by other parts of the application.
*/

// Code dependencies
const mongoose = require("mongoose");

// Create a schema for the event data
const eventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Create a model based on the schema
const Event = mongoose.model("Event", eventSchema);

// Export the model
module.exports = Event;
