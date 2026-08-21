const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AngryMessage = require("./models/AngryMessage");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Still Angry backend is running 😡");
});

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check username and password
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password.",
    });
  }

  // Create JWT token
  const token = jwt.sign(
    {
      username: process.env.ADMIN_USERNAME,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res.status(200).json({
    success: true,
    message: "Login successful!",
    token: token,
  });
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please log in.",
    });
  }

  // Expected format: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

// Save a new message
app.post("/api/angry", async (req, res) => {
  try {
    const { message } = req.body;

    // Check if the message is empty
    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please write something first.",
      });
    }

    // Save message to MongoDB
    const newMessage = await AngryMessage.create({
      message: message.trim(),
    });

    console.log("Message saved:", newMessage);

    res.status(201).json({
      success: true,
      message: "Your feelings have been saved ❤️",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong while saving your feelings.",
    });
  }
});

// Get all messages - PROTECTED
app.get("/api/angry", async (req, res) => {
  try {
    const messages = await AngryMessage.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      messages: messages,
    });
  } catch (error) {
    console.error("Error getting messages:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not get messages.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});