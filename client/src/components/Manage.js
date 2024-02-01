/*
Filename: Manage.js

Path: eventsManage/client/src/components/Manage.js

Code: JavaScript code for the Manage component of the client application (eventsManage) is
written in this file. This file contains the code for the Manage component. The Manage
component is used to render the list of events. The Manage component is exported so that
it can be used in other parts of the client application.
*/

// Code dependencies
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// Import css
import "../style.css";

// Manage component
const Manage = () => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Function to handle editing an event
  const handleEdit = (_id) => {
    history.push(`/manage/edit/${_id}`);
  };

  // Function to handle deleting an event
  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`${apiUrl}/manage/delete/${_id}`, {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
  
        if (response.ok) {
          // Remove the event from the state to update the UI
          setEvents(events.filter(event => event._id !== _id));
        } else {
          console.error('Failed to delete the event');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Fetch events
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
  
      // Check if token exists
      if (!token) {
        // Redirect to login if no token
        history.push("/login");
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/find/events`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setIsLoading(false);
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Expected an array of events, but received:', data);
          setEvents([]);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setEvents([]);
      }
    };

    // Call the function on component mount and clean up on unmount
    fetchEvents();
  }, [history, apiUrl]);

  // Return the Manage component
  return (
    <div>
      {/* Manage events */}
      <h1 className="manage">Events</h1>
      {/* Add Event link */}
      <button>
      <Link to="/manage/add" className="AddEvent">
        Add Event
      </Link>
      </button>
      <div className="manage-container">
        <div className="event-container">
          {/* Render each event */}
          {isLoading ? (
            <p>Loading events...</p>
            ) : (
            events.map((event) => (
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
                <div className="event-buttons">
                  {/* Edit button */}
                  <button
                    onClick={() => handleEdit(event._id)}
                    className="editButton"
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="deleteButton"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

// Export the Manage component
export default Manage;
