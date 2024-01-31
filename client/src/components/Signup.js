/*
Filename: Signup.js

Path: eventsManage/client/src/components/Signup.js

Code: JavaScript code for the Signup component of the client application (eventsManage) is
written in this file. This file contains the code for the Signup component. The Signup
component is used to render the signup form. The Signup component is exported so that
it can be used in other parts of the client application.
*/

// Code dependencies
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Import css
import "../style.css";

// Signup component
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const history = useHistory();

  // Function to handle user signup
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          isAdmin: accountType === "admin",
        }),
      });

      if (response.ok) {
        // Signup successful, navigate to another page
        history.push("/");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // Return the Signup component
  return (
    <div>
      <div className="container">
        {/* Signup header */}
        <h2 className="signup-header">Signup</h2>
        {/* Signup form */}
        <form onSubmit={handleSignup}>
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
          {/* Account type select */}
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Select Account Type</option>
            <option value="admin">Admin (Manage events)</option>
            <option value="user">User (Find Events)</option>
          </select>

          {/* Signup button */}
          <button type="submit" className="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

// Export the Signup component
export default Signup;
