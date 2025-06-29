
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) {
      alert("Please describe your symptoms.");
      return;
    }
    localStorage.setItem("userPrompt", prompt.trim());
    navigate("/results");
  }

  return (
    <div className="w-full max-w-xl p-8 mt-8 glass-card accent-glow fade-in">
      <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-cyan-100 drop-shadow-lg" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>Describe your symptoms</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full px-3 py-2 mb-4 rounded text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Type your symptoms or health question here..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={5}
          style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}
        />
        <button type="submit" className="w-full mt-2 fancy-btn">
          Ask Aniketbot
        </button>
      </form>
    </div>
  );
}
