/*
Filename: AdminLogin.js

Path: eventsManage/client/src/components/AdminLogin.js

Code: JavaScript code for the AdminLogin component of the client application (eventsManage) is
written in this file. This file contains the code for the AdminLogin component. The AdminLogin
component is used to render the login form for the admin. The AdminLogin component is exported
so that it can be used in other parts of the client application.
*/

// Code dependencies
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Import css
import "../style.css";

// AdminLogin component
const AdminLogin = () => {
  const [email, setEmail] = useState(""); // State variable for email input
  const [password, setPassword] = useState(""); // State variable for password input
  const history = useHistory(); // Access to the browser's history

  // Function to handle admin login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // Successful login response
        const { token, isAdmin } = await response.json();

        if (isAdmin) {
          // If admin, store token in local storage and redirect to manage endpoint
          localStorage.setItem("token", token);
          // Redirect to manage endpoint
          history.push("/manage");
          return;
        }
      }

      throw new Error("Invalid login credentials or user is not an admin");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Return the AdminLogin component
  return (
    <div>
      <div className="container">
        {/* Login header */}
        <h2 className="login-header">Admin Log in</h2>
        {/* Login form */}
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login button */}
          <button type="submit" className="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

// Export the AdminLogin component
export default AdminLogin;
