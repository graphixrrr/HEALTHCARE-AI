import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Results() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGemini() {
      setLoading(true);
      try {
        const prompt = localStorage.getItem("userPrompt") || "";
        const res = await axios.post("http://localhost:5001/api/ask-gemini", { prompt });
        setResponse(res.data.response);
      } catch (err) {
        setResponse(err?.response?.data?.error || "Failed to get advice from Gemini.");
      } finally {
        setLoading(false);
      }
    }
    fetchGemini();
  }, []);

  if (loading) return <p className="text-neutral-300">Aniketbot is thinking...</p>;
  return (
    <div className="w-full max-w-xl p-8 mt-8 glass-card purple-glow fade-in">
      <h2 className="mb-6 text-3xl font-bold leading-tight text-white drop-shadow-lg">Aniketbot's Advice</h2>
      <div className="mb-8 text-neutral-200 whitespace-pre-line" style={{ fontSize: "1.15rem" }}>{response}</div>
    </div>
  );
}
