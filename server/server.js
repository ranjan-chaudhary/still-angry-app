const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const AngryMessage = require("./models/AngryMessage");
const Letter = require("./models/Letter");
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

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password.",
    });
  }

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

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please log in.",
    });
  }

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

// ===============================
// ANGRY MESSAGES
// ===============================

// Save a new angry message
app.post("/api/angry", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please write something first.",
      });
    }

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

// Get all angry messages
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

// ===============================
// OPEN WHEN LETTERS
// ===============================

// Get one Open When letter
app.get("/api/letters/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const letter = await Letter.findOne({ type });

    res.status(200).json({
      success: true,
      content: letter ? letter.content : "",
    });
  } catch (error) {
    console.error("Error getting letter:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not get the letter.",
    });
  }
});

// Create or update an Open When letter
app.put("/api/letters/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { content } = req.body;

    const letter = await Letter.findOneAndUpdate(
      { type },
      {
        type,
        content: content || "",
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Letter saved successfully ❤️",
      letter: letter,
    });
  } catch (error) {
    console.error("Error saving letter:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not save the letter.",
    });
  }
});

// ===============================
// START SERVER - ALWAYS LAST
// ===============================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// ===============================
// TALK TO ME
// ===============================

// Get the Talk to Me message
app.get("/api/talk-to-me", async (req, res) => {
  try {
    const talkMessage = await TalkMessage.findOne();

    res.status(200).json({
      success: true,
      content: talkMessage ? talkMessage.content : "",
    });
  } catch (error) {
    console.error("Error getting Talk to Me message:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not get the message.",
    });
  }
});

// Create or update the Talk to Me message
app.put("/api/talk-to-me", async (req, res) => {
  try {
    const { content } = req.body;

    let talkMessage = await TalkMessage.findOne();

    if (talkMessage) {
      talkMessage.content = content || "";
      await talkMessage.save();
    } else {
      talkMessage = await TalkMessage.create({
        content: content || "",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message saved successfully ❤️",
      talkMessage,
    });
  } catch (error) {
    console.error("Error saving Talk to Me message:", error.message);

    res.status(500).json({
      success: false,
      message: "Could not save the message.",
    });
  }
});