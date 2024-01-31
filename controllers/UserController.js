/*
Filename: UserController.js

Path: eventsManage/controllers/UserController.js

Code: JavaScript code for the user controller of the application (eventsManage) is
written in this file. This file contains all the necessary functions to handle
client requests and manage user data. The user controller is exported so that it
can be used in other parts of the application.
*/

// Code dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User signup controller
exports.signup = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      isAdmin,
    });

    await user.save();

    res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: new RegExp('^' + email + '$', 'i') });

    if (!user) {
      console.log(`Login attempt failed: User not found for email ${email}`);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log(`Login attempt failed: Incorrect password for email ${email}`);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Updated JWT generation
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
};
