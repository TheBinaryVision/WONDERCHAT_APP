const express = require("express");
const router = express.Router();
const Message = require("..Server/models/Message");

router.get("/history", async (req, res) => {
  try {
    const messages = await Message.find().sort({ time: 1 }); // oldest to newest
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

module.exports = router;
