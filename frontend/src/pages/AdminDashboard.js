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

  const updateStatus = async (id, field, value) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        { [field]: value },
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
      return;
    }

    fetchComplaints();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "25px"
      }}>
        <h2 style={{ color: "white" }}>Admin Dashboard 🛠️</h2>

        {/* ✅ GRAPH */}
        <AdminCharts complaints={complaints} />

        {/* ✅ LIST */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          {complaints.map((c) => (
            <div key={c._id} style={styles.card}>

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{c.title}</h3>
                <p style={{ color: "#aaa", fontSize: "14px" }}>
                  {c.description}
                </p>

                <span style={{
                  ...styles.badge,
                  background:
                    c.status === "Resolved" ? "#28a745" :
                    c.status === "Pending" ? "#ffc107" :
                    c.status === "Escalated" ? "#dc3545" :
                    "#17a2b8"
                }}>
                  {c.status}
                </span>
              </div>

              <div style={styles.controls}>
                <select
                  value={c.status}
                  onChange={(e) =>
                    updateStatus(c._id, "status", e.target.value)
                  }
                  style={styles.select}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Escalated">Escalated</option>
                </select>

                <select
                  value={c.priority}
                  onChange={(e) =>
                    updateStatus(c._id, "priority", e.target.value)
                  }
                  style={styles.select}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "12px",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  },

  controls: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  select: {
    padding: "6px",
    borderRadius: "6px",
    border: "none",
    background: "#1e1e1e",
    color: "white",
    cursor: "pointer"
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "8px"
  }
};

export default AdminDashboard;