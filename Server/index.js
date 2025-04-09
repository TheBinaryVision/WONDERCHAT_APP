const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIO = require("socket.io");

const Message = require("./models/Message"); // adjust path if needed

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// ✅ REST API: Fetch chat history
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ time: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ✅ Socket.IO events
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async (msg) => {
    try {
      const savedMessage = new Message(msg);
      await savedMessage.save();
      io.emit("receive_message", savedMessage);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("userTyping", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const path = require("path");

// Serve frontend build
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
