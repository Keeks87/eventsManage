/*
Filename: EventController.js

Path: eventsManage/controllers/EventController.js

Code: JavaScript code for the event controller of the application (eventsManage) is
written in this file. This file contains the functions that are used to handle the
requests made to the server. The functions are exported so that they can be used in
other parts of the application.
*/

// Code dependencies
const Event = require("../models/Event");

// Route to get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Route to get a specific event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "registeredUsers"
    );
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route to add a new event
exports.createEvent = async (req, res) => {
  try {
    const {
      eventName,
      organizer,
      date,
      time,
      place,
      description,
      price,
      image,
    } = req.body;

    const event = new Event({
      eventName,
      organizer,
      date,
      time,
      place,
      description,
      price,
      image,
    });

    await event.save();

    res.json({ message: "Event added successfully" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Internal Server Error, check server logs for details." });
  }
};

// Route to update an existing event by ID
exports.updateEventById = async (req, res) => {
  try {
    const {
      eventName,
      organizer,
      date,
      time,
      place,
      description,
      price,
      image,
    } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event.eventName = eventName;
    event.organizer = organizer;
    event.date = date;
    event.time = time;
    event.place = place;
    event.description = description;
    event.price = price;
    event.image = image;

    await event.save();

    res.json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to delete an event by ID
exports.deleteEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
