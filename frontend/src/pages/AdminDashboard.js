import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import AdminCharts from "../components/AdminCharts";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/complaints",
      {
        headers: { Authorization: "Bearer " + token }
      }
    );
    setComplaints(res.data);
  };

  // 🔥 RENAMED FUNCTION
  const updateStatus = async (id, data) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        data,
        {
          headers: { Authorization: "Bearer " + token }
        }
      );
      fetchComplaints();
    } catch {
      alert("Update failed");
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.role !== "admin") {
    window.location.href = "/";
  }

}, []);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "white" }}>Admin Dashboard 🛠️</h2>

        <AdminCharts complaints={complaints} />

        {complaints.map((c) => (
          <div
            key={c._id}
            style={{
              background: "#111",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "10px",
              color: "white"
            }}
          >
            <h3>{c.title}</h3>
            <p>{c.description}</p>

            <p><b>Status:</b> {c.status}</p>
            <p><b>Priority:</b> {c.priority}</p>

            {/* ✅ STATUS */}
            <select
              onChange={(e) =>
                updateStatus(c._id, { status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Escalated</option>
            </select>

            {/* ✅ PRIORITY */}
            <select
              onChange={(e) =>
                updateStatus(c._id, { priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;