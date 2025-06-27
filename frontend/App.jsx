import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Results from "./Results";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white text-gray-900">
        <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">HealthSymptom Finder</h1>
          <div>
            <Link to="/" className="mr-4 hover:underline">Home</Link>
            <Link to="/results" className="hover:underline">Results</Link>
          </div>
        </nav>
        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <footer className="text-center p-4 text-gray-500">
          © 2025 HealthSymptom Finder
        </footer>
      </div>
    </Router>
  );
}
