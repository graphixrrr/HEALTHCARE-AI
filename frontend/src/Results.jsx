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
      } catch {
        setDiagnosis("Failed to fetch diagnosis.");
      } finally {
        setLoading(false);
      }
    }
    fetchDiagnosis();
  }, []);

  useEffect(() => {
    if (!diagnosis || typeof diagnosis === "string") return;
    if (window.myChart) window.myChart.destroy();

    window.myChart = new ChartJS(chartRef.current, {
      type: "bar",
      data: {
        labels: diagnosis.map((d) => d.Issue.Name),
        datasets: [
          {
            label: "Accuracy (%)",
            data: diagnosis.map((d) => d.Issue.Accuracy.toFixed(2)),
            backgroundColor: "rgba(99, 102, 241, 0.7)", // indigo-500
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

  if (loading) return <p className="text-neutral-300">Loading diagnosis...</p>;
  if (typeof diagnosis === "string") return <p className="font-semibold text-red-500">{diagnosis}</p>;

  return (
    <div className="w-full max-w-xl p-8 mt-8 glass-card purple-glow fade-in">
      <h2 className="mb-6 text-3xl font-bold leading-tight text-white drop-shadow-lg">Diagnosis Results</h2>
      <ul className="mb-8 divide-y divide-neutral-700">
        {diagnosis.map(({ Issue }) => (
          <li key={Issue.ID} className="py-3 text-neutral-200">
            <strong className="text-lg">{Issue.Name}</strong> (Accuracy: {Issue.Accuracy.toFixed(2)}%)<br />
            <em className="text-neutral-400">{Issue.IcdName}</em>
          </li>
        ))}
      </ul>
      <h3 className="mb-4 text-xl font-semibold text-white">Accuracy Chart</h3>
      <div className="p-4 rounded bg-neutral-900 bg-opacity-80 purple-glow">
        <canvas ref={chartRef} height={150} />
      </div>
    </div>
  );
}
