/*
Filename: UserLogin.js

Path: eventsManage/client/src/components/UserLogin.js

Code: JavaScript code for the UserLogin component of the client application (eventsManage) is
written in this file. This file contains the code for the UserLogin component. The UserLogin
component is used to render the user login form. The UserLogin component is exported so that
it can be used in other parts of the client application.
*/

// Code dependencies
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Import css
import "../style.css";

// UserLogin component
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

    try {
      // Send login request to the server
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
        const { token, isAdmin } = await response.json();

        if (!isAdmin) {
          localStorage.setItem("token", token);
          history.push("/find"); // Redirect user to the find endpoint
        } else {
          throw new Error("User is an admin");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Return the UserLogin component
  return (
    <div>
      <div className="container">
        {/* Login header */}
        <h2 className="login-header">User Log in</h2>
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

// Export the UserLogin component
export default UserLogin;
