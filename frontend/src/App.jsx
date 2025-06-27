import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Results from "./Results";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-white animated-gradient" style={{ position: 'relative', zIndex: 1 }}>
        {/* Floating particles background */}
        <div className="particles-bg" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${18 + Math.random() * 32}px`,
                height: `${18 + Math.random() * 32}px`,
                bottom: `-${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 12}s`,
              }}
            />
          ))}
        </div>
        <nav className="flex items-center justify-between w-full p-4 glass-card accent-glow mb-4 mt-2 mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold leading-tight text-white drop-shadow-lg tracking-tight">HealthSymptom Finder</h1>
          <div>
            <Link to="/" className="mr-4 font-semibold text-cyan-200 no-underline hover:text-orange-300 transition-colors duration-200">Home</Link>
            <Link to="/results" className="font-semibold text-cyan-200 no-underline hover:text-orange-300 transition-colors duration-200">Results</Link>
          </div>
        </nav>
        <main className="flex flex-col items-center justify-center flex-1 w-full p-6 fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <footer className="w-full p-4 text-sm text-center glass-card accent-glow mt-4 mb-2 mx-auto max-w-5xl text-cyan-100 border-t border-cyan-900">
          © 2025 HealthSymptom Finder
        </footer>
      </div>
    </Router>
  );
}
