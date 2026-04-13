import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users",
        {
          headers: { Authorization: "Bearer " + token }
        }
      );
      setUsers(res.data);
    } catch {
      alert("Failed to fetch users");
    }
  };

  // 🔥 DELETE USER
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      fetchUsers(); // refresh list
    } catch {
      alert("Delete failed");
    }
  };

  // 🔐 ADMIN CHECK
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role !== "admin") {
      window.location.href = "/";
      return;
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>All Users 👥</h2>

        {users.length === 0 ? (
          <p style={{ color: "#aaa" }}>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} style={styles.card}>
              
              {/* LEFT INFO */}
              <div>
                <p style={styles.email}>{user.email}</p>
                <span style={{
                  ...styles.role,
                  background:
                    user.role === "admin" ? "#ff4d4d" : "#17a2b8"
                }}>
                  {user.role}
                </span>
              </div>

              {/* RIGHT ACTION */}
              <button
                style={styles.deleteBtn}
                onClick={() => deleteUser(user._id)}
              >
                🗑 Delete
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "25px"
  },

  heading: {
    color: "white",
    marginBottom: "20px"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    padding: "15px 20px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    transition: "0.3s"
  },

  email: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "500"
  },

  role: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    marginTop: "6px",
    display: "inline-block",
    color: "white"
  },

  deleteBtn: {
    background: "linear-gradient(90deg, #ff4d4d, #ff1a1a)",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s"
  }
};

export default Users;