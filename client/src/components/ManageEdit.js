/*
Filename: ManageEdit.js

Path: eventsManage/client/src/components/ManageEdit.js

Code: JavaScript code for the ManageEdit component of the client application (eventsManage) is
written in this file. This file contains the code for the ManageEdit component. The ManageEdit
component is used to render the form for editing an event. The ManageEdit component is exported
so that it can be used in other parts of the client application.
*/

// Code dependencies
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// Import css
import "../style.css";

// ManageEdit component
const ManageEdit = () => {
  const [eventName, setEventName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const history = useHistory();
  const { id: _id } = useParams();

  useEffect(() => {
    // Fetch event data for editing
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/manage/edit/${_id}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the state with the fetched data
        setEventName(data.eventName);
        setOrganizer(data.organizer);
        setDate(data.date);
        setTime(data.time);
        setPlace(data.place);
        setDescription(data.description);
        setPrice(data.price);
        setImagePreview(data.image);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [_id]);

  // Function to handle editing an event
  const handleEditEvent = (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const eventData = {
      eventName,
      organizer,
      date,
      time,
      place,
      description,
      price,
      image: imagePreview,
    };

    // Update the event data with the PUT request
    fetch(`${apiUrl}/manage/edit/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Reset form values
        setEventName("");
        setOrganizer("");
        setDate("");
        setTime("");
        setPlace("");
        setDescription("");
        setPrice("");
        setImagePreview(null);

        history.push("/manage");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The `result` property contains the data URL string
        const imageData = reader.result;
        setImagePreview(imageData);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  // Return the ManageEdit component
  return (
    <div>
      {/* Form */}
      <form onSubmit={handleEditEvent}>
        {/* Image upload */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Event Preview"
            className="image-preview"
          />
        )}
        <input
          className="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {/* Event details */}
        <div className="event-details">
          <input
            className="EventName"
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <input
            className="Organizer"
            type="text"
            placeholder="Organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            required
          />
        </div>
        {/* Date and time */}
        <div className="date-time">
          <input
            className="Date"
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            className="Time"
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        {/* Other input fields */}
        <input
          className="Place"
          type="text"
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />
        <input
          className="Description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="Price"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {/* Submit button */}
        <button type="submit" className="save">
          Save Changes
        </button>
      </form>
    </div>
  );
};

// Export the ManageEdit component
export default ManageEdit;
