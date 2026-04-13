import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Charts({ complaints }) {

  // STATUS COUNT
  const statusData = {
    Pending: complaints.filter(c => c.status === "Pending").length,
    Resolved: complaints.filter(c => c.status === "Resolved").length,
    Progress: complaints.filter(c => c.status === "In Progress").length,
    Escalated: complaints.filter(c => c.status === "Escalated").length
  };

  // PRIORITY COUNT
  const priorityData = {
    High: complaints.filter(c => c.priority === "High").length,
    Medium: complaints.filter(c => c.priority === "Medium").length,
    Low: complaints.filter(c => c.priority === "Low").length
  };

  // PIE DATA (GRADIENT COLORS)
  const pieData = {
    labels: ["Pending", "In Progress", "Resolved", "Escalated"],
    datasets: [
      {
        data: [
          statusData.Pending,
          statusData.Progress,
          statusData.Resolved,
          statusData.Escalated
        ],
        backgroundColor: [
          "#ff9800",
          "#03a9f4",
          "#4caf50",
          "#f44336"
        ],
        borderWidth: 2,
        borderColor: "#fff"
      }
    ]
  };

  // BAR DATA
  const barData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Priority",
        data: [
          priorityData.High,
          priorityData.Medium,
          priorityData.Low
        ],
        backgroundColor: [
          "#ff4d4d",
          "#ffa726",
          "#66bb6a"
        ],
        borderRadius: 8
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    },
    responsive: true,
    animation: {
      duration: 1500
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: "30px",
      flexWrap: "wrap"
    }}>
      <div className="card" style={{ width: "350px" }}>
        <h3>📊 Complaint Status</h3>
        <Pie data={pieData} options={options} />
      </div>

      <div className="card" style={{ width: "350px" }}>
        <h3>⚡ Priority Analysis</h3>
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
}

export default Charts;