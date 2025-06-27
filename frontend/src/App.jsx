import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Results from "./Results";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-white bg-neutral-900">
        <nav className="flex items-center justify-between w-full p-4 bg-transparent border-b border-neutral-800">
          <h1 className="text-4xl font-bold leading-tight">HealthSymptom Finder</h1>
          <div>
            <Link to="/" className="mr-4 font-medium text-indigo-400 no-underline hover:text-indigo-300">Home</Link>
            <Link to="/results" className="font-medium text-indigo-400 no-underline hover:text-indigo-300">Results</Link>
          </div>
        </nav>
        <main className="flex flex-col items-center justify-center flex-1 w-full p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <footer className="w-full p-4 text-sm text-center bg-transparent border-t text-neutral-400 border-neutral-800">
          © 2025 HealthSymptom Finder
        </footer>
      </div>
    </Router>
  );
}
