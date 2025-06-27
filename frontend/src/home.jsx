import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
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
    navigate("/results");
  }

  return (
    <div className="w-full max-w-xl p-8 mt-8 rounded-lg shadow-lg bg-neutral-800">
      <h2 className="mb-4 text-3xl font-bold leading-tight text-white">Select your symptoms</h2>
      {loading ? (
        <p className="text-neutral-300">Loading symptoms...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="p-3 mb-4 overflow-y-auto border rounded border-neutral-700 max-h-72 bg-neutral-900">
            {allSymptoms.map(({ ID, Name }) => (
              <label key={ID} className="block mb-1 cursor-pointer text-neutral-200">
                <input
                  type="checkbox"
                  className="mr-2 accent-indigo-500"
                  checked={selectedSymptoms.includes(ID)}
                  onChange={() => toggleSymptom(ID)}
                />
                {Name}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="px-6 py-2 text-base font-medium text-white transition-colors duration-200 bg-indigo-600 border border-transparent rounded-lg cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Get Diagnosis
          </button>
        </form>
      )}
    </div>
  );
}
