/*
Filename: isAdmin.js

Path: eventsManage/middleware/isAdmin.js

Code: JavaScript code for the middleware function that checks if the user is an
admin is written in this file. The middleware function is exported so that it can
be used in other parts of the application.
*/

// Code dependencies
const jwt = require("jsonwebtoken");

// Middleware function to check if user is an admin
const isAdmin = (req, res, next) => {
  let token = req.headers.authorization;

  // Check if token is in the correct format (Bearer Token)
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const secretKey = process.env.JWT_SECRET; // Using environment variable for the secret key
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    if (!decoded.isAdmin) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Export the middleware function
module.exports = isAdmin;
