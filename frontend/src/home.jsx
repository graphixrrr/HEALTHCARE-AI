import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [customSymptoms, setCustomSymptoms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSymptoms() {
      try {
        // 🔄 Updated to port 5001
        const res = await axios.get("http://localhost:5001/api/symptoms");
        setAllSymptoms(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSymptoms();
  }, []);

  function toggleSymptom(id) {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedSymptoms.length) {
      alert("Select at least one symptom.");
      return;
    }
    localStorage.setItem("selectedSymptoms", JSON.stringify(selectedSymptoms));
    axios.post("http://localhost:5001/api/diagnose", { symptoms: selectedSymptoms })
      .then(response => {
        navigate("/results");
      })
      .catch(error => {
        console.error("Error getting diagnosis:", error);
        alert("An error occurred while getting the diagnosis. Please try again later.");
      });
  }

  const filteredSymptoms = allSymptoms.filter(({ Name }) =>
    Name.toLowerCase().includes(filter.toLowerCase())
  );

  function handleAddCustomSymptom(e) {
    e.preventDefault();
    const trimmed = filter.trim();
    if (!trimmed) return;
    // Prevent duplicates (case-insensitive)
    const exists =
      allSymptoms.some((s) => s.Name.toLowerCase() === trimmed.toLowerCase()) ||
      customSymptoms.some((s) => s.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      setCustomSymptoms((prev) => [...prev, trimmed]);
      setSelectedSymptoms((prev) => [...prev, trimmed]);
    }
    setFilter("");
  }

  return (
    <div className="w-full max-w-xl p-8 mt-8 glass-card accent-glow fade-in">
      <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-cyan-100 drop-shadow-lg" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>Select your symptoms</h2>
      {loading ? (
        <p className="text-cyan-200">Loading symptoms...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full px-3 py-2 mb-2 rounded text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Type or search symptoms..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustomSymptom(e);
              }
            }}
            style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}
          />
          {filter &&
            !allSymptoms.some((s) => s.Name.toLowerCase() === filter.trim().toLowerCase()) &&
            !customSymptoms.some((s) => s.toLowerCase() === filter.trim().toLowerCase()) && (
              <button
                className="px-3 py-1 mb-2 fancy-btn"
                onClick={handleAddCustomSymptom}
                type="button"
              >
                Add "{filter.trim()}" as custom symptom
              </button>
            )}
          <div className="p-3 mb-4 overflow-y-auto border rounded border-cyan-900 max-h-72 bg-cyan-950 bg-opacity-70">
            {filteredSymptoms.map(({ ID, Name }) => (
              <label key={ID} className="block mb-1 transition-colors duration-150 cursor-pointer text-cyan-100 hover:text-orange-300" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>
                <input
                  type="checkbox"
                  className="mr-2 transition-transform duration-150 scale-110 accent-cyan-400 hover:scale-125"
                  checked={selectedSymptoms.includes(ID)}
                  onChange={() => toggleSymptom(ID)}
                />
                {Name}
              </label>
            ))}
            {customSymptoms.map((symptom) => (
              <label key={symptom} className="block mb-1 text-orange-200 transition-colors duration-150 cursor-pointer hover:text-cyan-200" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>
                <input
                  type="checkbox"
                  className="mr-2 transition-transform duration-150 scale-110 accent-orange-400 hover:scale-125"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() =>
                    setSelectedSymptoms((prev) =>
                      prev.includes(symptom)
                        ? prev.filter((x) => x !== symptom)
                        : [...prev, symptom]
                    )
                  }
                />
                {symptom} <span className="text-xs">(custom)</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="w-full mt-2 fancy-btn"
          >
            Get Diagnosis
          </button>
        </form>
      )}
    </div>
  );
}
