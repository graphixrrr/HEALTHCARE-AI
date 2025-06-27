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
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-semibold mb-4">Select your symptoms</h2>
      {loading ? (
        <p>Loading symptoms...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="max-h-72 overflow-y-auto border rounded p-3 mb-4">
            {allSymptoms.map(({ ID, Name }) => (
              <label key={ID} className="block mb-1 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedSymptoms.includes(ID)}
                  onChange={() => toggleSymptom(ID)}
                />
                {Name}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded font-semibold transition"
          >
            Get Diagnosis
          </button>
        </form>
      )}
    </div>
);
}
