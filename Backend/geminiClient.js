const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Common symptoms list since Gemini doesn't provide a predefined list
const commonSymptoms = [
  { id: 1, name: "Headache" },
  { id: 2, name: "Fever" },
  { id: 3, name: "Cough" },
  { id: 4, name: "Sore throat" },
  { id: 5, name: "Fatigue" },
  { id: 6, name: "Nausea" },
  { id: 7, name: "Vomiting" },
  { id: 8, name: "Diarrhea" },
  { id: 9, name: "Chest pain" },
  { id: 10, name: "Shortness of breath" },
  { id: 11, name: "Dizziness" },
  { id: 12, name: "Muscle aches" },
  { id: 13, name: "Joint pain" },
  { id: 14, name: "Rash" },
  { id: 15, name: "Abdominal pain" },
  { id: 16, name: "Back pain" },
  { id: 17, name: "Runny nose" },
  { id: 18, name: "Sneezing" },
  { id: 19, name: "Loss of appetite" },
  { id: 20, name: "Weight loss" },
  { id: 21, name: "Weight gain" },
  { id: 22, name: "Sleep problems" },
  { id: 23, name: "Anxiety" },
  { id: 24, name: "Depression" },
  { id: 25, name: "Swelling" }
];

async function getSymptoms() {
  try {
    console.log("[geminiClient] getSymptoms - Returning common symptoms list");
    return commonSymptoms;
  } catch (err) {
    console.error("[geminiClient] getSymptoms - Error:", err);
    throw err;
  }
}

async function getDiagnosis(symptoms) {
  try {
    console.log("[geminiClient] getDiagnosis - Processing symptoms:", symptoms);
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }

    // Convert symptom IDs to names
    const symptomNames = symptoms.map(symptomId => {
      const symptom = commonSymptoms.find(s => s.id === parseInt(symptomId));
      return symptom ? symptom.name : `Unknown symptom (ID: ${symptomId})`;
    });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `As a medical AI assistant, analyze the following symptoms and provide potential diagnoses. Please be thorough but remember this is for informational purposes only and should not replace professional medical advice.

Symptoms reported: ${symptomNames.join(", ")}

Please provide:
1. Most likely conditions (3-5 possibilities)
2. Brief explanation for each condition
3. Recommended next steps
4. Important disclaimer about seeking professional medical care

Format your response as a JSON object with the following structure:
{
  "conditions": [
    {
      "name": "Condition Name",
      "probability": "High/Medium/Low",
      "description": "Brief description of the condition",
      "explanation": "Why these symptoms match this condition"
    }
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2"
  ],
  "disclaimer": "Important medical disclaimer"
}`;

    console.log("[geminiClient] getDiagnosis - Sending request to Gemini");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("[geminiClient] getDiagnosis - Received response from Gemini");
    
    try {
      // Try to parse as JSON
      const jsonResponse = JSON.parse(text);
      return jsonResponse;
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      console.warn("[geminiClient] getDiagnosis - Failed to parse JSON, returning raw text");
      return {
        conditions: [{
          name: "Analysis Result",
          probability: "Unknown",
          description: text,
          explanation: "Generated analysis from AI model"
        }],
        recommendations: ["Consult with a healthcare professional"],
        disclaimer: "This is AI-generated information and should not replace professional medical advice."
      };
    }
  } catch (err) {
    console.error("[geminiClient] getDiagnosis - Error:", err);
    throw err;
  }
}

module.exports = { getSymptoms, getDiagnosis };