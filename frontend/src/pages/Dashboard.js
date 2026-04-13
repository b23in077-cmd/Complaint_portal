import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";
function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const res = await axios.get("http://localhost:5000/api/complaints", {
      headers: { Authorization: "Bearer " + token }
    });
    setComplaints(res.data);
  };

  const upvote = async (id) => {
    await axios.put(`http://localhost:5000/api/complaints/upvote/${id}`, {}, {
      headers: { Authorization: "Bearer " + token }
    });
    fetchComplaints();
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>📊 Dashboard</h2>

        {/* STATS */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div className="card">📊 Total: {complaints.length}</div>
          <div className="card">⏳ Pending: {complaints.filter(c => c.status==="Pending").length}</div>
          <div className="card">✅ Resolved: {complaints.filter(c => c.status==="Resolved").length}</div>
        </div>
        <Charts complaints={complaints} />
        {/* LIST */}
        {complaints.map(c => (
          <div className="card" key={c._id}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>

            <p>📍 {c.location?.city}</p>
            <p>⚡ {c.priority}</p>

            <p>
              Status:
              <span style={{
                color:
                  c.status === "Resolved" ? "lightgreen" :
                  c.status === "Pending" ? "orange" : "cyan"
              }}>
                {" "}{c.status}
              </span>
            </p>

            <button onClick={() => upvote(c._id)}>
              👍 {c.upvotes.length}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;