/*
Filename: ManageEdit.js

Path: eventsManage/client/src/components/ManageEdit.js

Code: JavaScript code for the ManageEdit component of the client application (eventsManage) is
written in this file. This file contains the code for the ManageEdit component. The ManageEdit
component is used to render the form for editing an event. The ManageEdit component is exported
so that it can be used in other parts of the client application.
*/

// Code dependencies
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Import css
import "../style.css";

// ManageAdd component
const ManageAdd = () => {
  const [eventName, setEventName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The `result` property contains the data URL string
        const imageData = reader.result;
        setImage(imageData);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  // Function to handle adding an event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    
    // Validation check for empty fields
    if (!eventName || !organizer || !date || !time || !place || !description || !price || !image) {
      alert("Please fill in all fields");
      return;
    }

    // Create an object with the event data
    const event = {
      eventName,
      organizer,
      date,
      time,
      place,
      description,
      price,
      image,
    };

    try {
      // Send a request to the server to add the event
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Use environment variable
      const response = await fetch(`${apiUrl}/manage/add`, { // Adjusted for dynamic API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        // Reset form values
        setEventName("");
        setOrganizer("");
        setDate("");
        setTime("");
        setPlace("");
        setDescription("");
        setPrice("");
        setImage(null);

        // Navigate to the manage endpoint
        history.push("/manage");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Return the ManageAdd component
  return (
    <div>
      {/* Add Event form */}
      <form onSubmit={handleAddEvent}>
        {/* Image upload */}
        <input
          className="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div className="event-details">
          {/* Event Name input */}
          <input
            className="EventName"
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          {/* Organizer input */}
          <input
            className="Organizer"
            type="text"
            placeholder="Organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            required
          />
        </div>
        <div className="date-time">
          {/* Date input */}
          <input
            className="Date"
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          {/* Time input */}
          <input
            className="Time"
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        {/* Place input */}
        <input
          className="Place"
          type="text"
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />
        {/* Description input */}
        <input
          className="Description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* Price input */}
        <input
          className="Price"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit" className="add">
          Add Event
        </button>
      </form>
    </div>
  );
};

// Export the ManageAdd component
export default ManageAdd;
