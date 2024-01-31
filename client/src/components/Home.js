/*
Filename: Home.js

Path: eventsManage/client/src/components/Home.js

Code: JavaScript code for the Home component of the client application (eventsManage) is
written in this file. This file contains the code for the Home component. The Home
component is used to render the home page of the application. The Home component is
exported so that it can be used in other parts of the client application.
*/

// Code dependencies
import React from "react";
import { Link } from "react-router-dom";

// Import CSS
import "../style.css";

// Home component
const Home = () => {
  return (
    <div>
      <div className="Home">

        {/* Admin section */}
        <div className="Admin">
          {/* User section heading */}
          <h2 className="discoverEvents">The best places to be this season</h2>
          {/* Admin section heading */}
          <h1 className="uploadEvents">Find Your Event</h1>
        </div>
        
        {/* User section */}
        <div className="User">
          {/* User section subheading */}
          <h2 className="Register">
            Register for events
          </h2>
          {/* Admin section subheading */}
          <h2 className="Manage">
            Manage your own events</h2>
          {/* User section button */}
          <button>
          <Link to="/manage" className="registerButton">
            Manage events →
          </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the Home component
export default Home;
