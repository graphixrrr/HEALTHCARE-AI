require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getSymptoms, getDiagnosis } = require("./apiMedicClient");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HealthCare AI Backend Running");
});

// Fetch list of all symptoms
app.get("/api/symptoms", async (req, res) => {
  try {
    const symptoms = await getSymptoms();
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Diagnose based on selected symptom IDs
app.post("/api/diagnose", async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: "Symptoms array required" });
    }
    const diagnosis = await getDiagnosis(symptoms);
    res.json(diagnosis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
