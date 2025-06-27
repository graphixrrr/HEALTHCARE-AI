import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Results() {
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchDiagnosis() {
      try {
        const selected = JSON.parse(localStorage.getItem("selectedSymptoms") || "[]");
        // ⚙️ Updated to port 5001
        const res = await axios.post("http://localhost:5001/api/diagnose", {
          symptoms: selected,
        });
        setDiagnosis(res.data);
      } catch (err) {
        setError("Failed to fetch diagnosis.");
      } finally {
        setLoading(false);
      }
    }
    fetchDiagnosis();
  }, []);

  useEffect(() => {
    if (!diagnosis) return;
    if (window.myChart) window.myChart.destroy();

    window.myChart = new ChartJS(chartRef.current, {
      type: "bar",
      data: {
        labels: diagnosis.map((d) => d.Issue.Name),
        datasets: [
          {
            label: "Accuracy (%)",
            data: diagnosis.map((d) => d.Issue.Accuracy.toFixed(2)),
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: { y: { beginAtZero: true, max: 100 } },
      },
    });
  }, [diagnosis]);

  if (loading) return <p>Loading diagnosis...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-semibold mb-6">Diagnosis Results</h2>
      <ul className="mb-8">
        {diagnosis.map(({ Issue }) => (
          <li key={Issue.ID} className="mb-3 border-b pb-2">
            <strong>{Issue.Name}</strong> (Accuracy:{" "}
            {Issue.Accuracy.toFixed(2)}%)<br />
            <em>{Issue.IcdName}</em>
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-4">Accuracy Chart</h3>
      <canvas ref={chartRef} height={150} />
    </div>
  );
}
