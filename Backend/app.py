# pyright: reportPrivateImportUsage=false
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai  # type: ignore

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)  # type: ignore

@app.route("/", methods=["GET"])
def home():
    return "HealthCare AI Backend Running (Gemini, Python)"

@app.route("/api/ask-gemini", methods=["POST"])
def ask_gemini():
    data = request.get_json()
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "Prompt is required."}), 400
    try:
        # Compose the prompt for Gemini
        prompt_text = (
            "You are a helpful health assistant. "
            "A user will describe their symptoms in a few words. "
            "Your job is to guess what might be wrong with them and offer helpful advice. "
            f"User's symptoms: {prompt}"
        )
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt_text)
        gemini_text = response.text if hasattr(response, 'text') else str(response)
        return jsonify({"response": gemini_text})
    except Exception as e:
        print("Gemini API error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=port) 