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
  console.log("[GET] /api/symptoms - Incoming request");
  try {
    const symptoms = await getSymptoms();
    console.log("[GET] /api/symptoms - Success, symptoms count:", Array.isArray(symptoms) ? symptoms.length : 'N/A');
    res.json(symptoms);
  } catch (err) {
    console.error("[GET] /api/symptoms - Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Diagnose based on selected symptom IDs
app.post("/api/diagnose", async (req, res) => {
  console.log("[POST] /api/diagnose - Incoming request, body:", req.body);
  try {
    const { symptoms } = req.body;
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      console.warn("[POST] /api/diagnose - Invalid symptoms array:", symptoms);
      return res.status(400).json({ error: "Symptoms array required" });
    }
    const diagnosis = await getDiagnosis(symptoms);
    console.log("[POST] /api/diagnose - Success, diagnosis count:", Array.isArray(diagnosis) ? diagnosis.length : 'N/A');
    res.json(diagnosis);
  } catch (err) {
    console.error("[POST] /api/diagnose - Error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
