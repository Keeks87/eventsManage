/*
Filename: routes.js

Path: eventsManage/routes.js

Code: JavaScript code for routes of the application (eventsManage) is written in
this file. This file contains all the routes of the application. The routes are
divided into two parts: public routes and admin routes. The public routes are
accessible to all the users, whereas the admin routes are accessible only to
the admin. The admin routes are protected using the isAdmin middleware. The
routes are defined using the express router. The routes are exported so that
they can be used in the index.js file.
*/

// Code dependencies 
const express = require("express");
const router = express.Router();

// Import the controllers from the controller folder
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const isAdmin = require("./middleware/isAdmin");

// Public routes (not logged in)
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/find/events", EventController.getAllEvents);
router.post("/manage/add", EventController.createEvent);

// Admin required
router.put("/manage/edit/:id", isAdmin, EventController.updateEventById);
router.get("/manage/edit/:id", isAdmin, EventController.getEventById);
router.delete("/manage/delete/:id", isAdmin, EventController.deleteEventById);

// Export the router
module.exports = router;
