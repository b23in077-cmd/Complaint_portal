import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function AdminCharts({ complaints }) {

  const count = {
    Pending: 0,
    "In Progress": 0,
    Resolved: 0,
    Escalated: 0
  };

  complaints.forEach(c => {
    count[c.status] = (count[c.status] || 0) + 1;
  });

  const data = {
    labels: Object.keys(count),
    datasets: [
      {
        label: "Complaints Status",
        data: Object.values(count),

        backgroundColor: [
          "#ffc107",   // Pending
          "#17a2b8",   // In Progress
          "#28a745",   // Resolved
          "#dc3545"    // Escalated
        ],

        borderRadius: 8,
        barThickness: 40
      }
    ]
  };

  const options = {
    responsive: true,

    // 🔥 MOST IMPORTANT FIX
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#ccc"
      }
    },

    scales: {
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.1)" },
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "40px"
    }}>
      <h3 style={{ color: "white", marginBottom: "15px" }}>
        Complaint Analytics 📊
      </h3>

      {/* ✅ FIXED HEIGHT CONTAINER */}
      <div style={{ height: "250px", width: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default AdminCharts;