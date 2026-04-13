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
      }
    ]
  };

  return (
    <div style={{
      background: "#111",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "20px"
    }}>
      <h3 style={{ color: "white" }}>Complaint Analytics</h3>
      <Bar data={data} />
    </div>
  );
}

export default AdminCharts;