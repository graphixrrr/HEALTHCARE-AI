require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("HealthCare AI Backend Running (Gemini)");
});

// Gemini endpoint: accepts { prompt: "..." }
app.post("/api/ask-gemini", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required." });
  }
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;
    console.log("Sending request to Gemini API...");
    const response = await axios.post(geminiUrl, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    console.log("Gemini API response:", JSON.stringify(response.data, null, 2));
    const geminiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    res.json({ response: geminiText });
  } catch (err) {
    console.error("Gemini API error:", err?.response?.data || err.message || err);
    const geminiError = err?.response?.data?.error?.message || err.message || "Unknown error";
    res.status(500).json({ error: geminiError });
  }
});

// Serve React static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// Catch-all: send index.html for any route not handled by API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
