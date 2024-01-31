/*
Filename: Find.js

Path: eventsManage/client/src/components/Find.js

Code: JavaScript code for the Find component of the client application (eventsManage) is
written in this file. This file contains the code for the Find component. The Find
component is used to render the list of events. The Find component is exported so that
it can be used in other parts of the client application.
*/

// Code dependencies
import React, { useState, useEffect } from "react";

// Import css
import "../style.css";

// Find component
const Find = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  // Function to fetch all events
  const getAllEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/find/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(events)

  // Return the Find component
  return (
    <div>
      <h1 className="events">Events</h1>
      <div className="find-container">
        <div className="event-container">
          {events.map((event) => (
            <div key={event._id} className="event">
              <img
                src={event.image}
                alt={event.eventName}
                className="event-img"
              />
              <div className="event-details">
                <div className="event-details-row">
                  <h3>{event.eventName}</h3>
                  <p>Organizer: {event.organizer}</p>
                </div>
                <div className="event-details-row">
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <p>Place: {event.place}</p>
                </div>
                <p>Description: {event.description}</p>
                <div className="event-details-row">
                  <p>Price: {event.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export the Find component
export default Find;
